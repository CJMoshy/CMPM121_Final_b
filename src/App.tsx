import "./App.css";
// @deno-types="@types/react"

import RenderingEngine from "./component/RenderingEngine.tsx";
import PlayerController from "./component/PlayerController.tsx";
import GameController from "./component/GameController.tsx"; // react component
import GameManager from "./controller/GameManager.ts"; // ts class that does the lifting
import PlantableUI from "./component/PlantableUI.tsx";
import SelectPlantUI from "./component/SelectPlantUI.tsx";
import SaveNLoad from "./component/SaveNLoad.tsx";
import UndoRedo from "./component/UndoRedo.tsx";
import GameWinDisplay from "./component/GameWinDisplay.tsx";
import PlantManager from "./controller/PlantController.ts";
import CommandPipeline from "./util/CommandPipeline/CommandPipeline.ts";
import Action from "./util/CommandPipeline/Action.ts";
import {
  CellContext,
  CellIndexContext,
  LevelContext,
  PlantContext,
  TranslateContext,
  TurnContext,
} from "./Context.ts";
import { useEffect, useState } from "react";
import { plants } from "./util/DSL/PlantTypes.ts";
import Translator from "./component/TranslateUI.tsx";
import GameTurnDisplay from "./component/GameTurnDisplay.tsx";

const plantManager = new PlantManager(plants);
const gameManager = new GameManager(plantManager);
const cmdPipeline = new CommandPipeline(gameManager);

document.addEventListener("gameStateAdvance", () => handleGameStateAdv());

const handleGameStateAdv = () => {
  const state: GameState = {
    currentTurn: gameManager.turnCounter,
    currentLevel: gameManager.currentLevel,
    plantData: Array.from(
      new Uint8Array(plantManager.getPlantableCellBuffer()),
    ),
  };
  cmdPipeline.clearRedoStack();
  cmdPipeline.addCommand(new Action(state));
  cmdPipeline.saveToLocalStorage();
};

function App() {
  const [selectedCellIndex, setSelectedCellIndex] = useState<
    number | undefined
  >(undefined);

  // Use state to store the cell
  const [cell, setCell] = useState<Cell | undefined>(undefined);

  const [selectedPlant, setSelectedPlant] = useState<PlantSpecies | undefined>(
    undefined,
  );

  const [currentLanguage, setLanguage] = useState<string>("en");
  if ("ServiceWorker" in navigator) {
    navigator.serviceWorker.register("./ServiceWorker.ts");
  }

  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentTurn, setCurrentTurn] = useState<number>(1);

  plantManager.loadSprites();

  const incrementLevel = (e: CustomEvent) => {
    setCurrentLevel(e.detail);
  };

  useEffect(() => {
    gameManager.initGame();
    self.addEventListener(
      "levelComplete",
      (e) => incrementLevel(e as CustomEvent),
    );
  }, []);

  return (
    <>
      <CellIndexContext.Provider
        value={{ selectedCellIndex, setSelectedCellIndex }}
      >
        <CellContext.Provider value={{ cell, setCell }}>
          <PlantContext.Provider value={{ selectedPlant, setSelectedPlant }}>
            <TranslateContext.Provider value={{ currentLanguage, setLanguage }}>
              <LevelContext.Provider value={{ currentLevel, setCurrentLevel }}>
                <TurnContext.Provider value={{ currentTurn, setCurrentTurn }}>
                  <RenderingEngine plantManager={plantManager} />
                  <GameWinDisplay gameManager={gameManager} />
                  <GameTurnDisplay gameManager={gameManager} />
                  <PlayerController />
                  <GameController plantManager={plantManager} />
                  <SaveNLoad gameManager={gameManager} />
                  <UndoRedo cmdPipe={cmdPipeline} />
                  <SelectPlantUI plants={plants} />
                  <Translator />
                  <PlantableUI plantManager={plantManager} />
                </TurnContext.Provider>
              </LevelContext.Provider>
            </TranslateContext.Provider>
          </PlantContext.Provider>
        </CellContext.Provider>
      </CellIndexContext.Provider>
    </>
  );
}

export default App;
