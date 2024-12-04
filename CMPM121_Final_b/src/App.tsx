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
import PlantManager from "./controller/PlantController.ts";
import CommandPipeline from "./util/CommandPipeline.ts";
import Action from "./util/Action.ts";
import PlantType from "./util/PlantDSL.ts";
import { CellContext, CellIndexContext, PlantContext } from "./Context.ts";
import { useEffect, useState } from "react";

// set up plant dsl
const plants: PlantType[] = [];

plants.push(
  PlantType.create("Wheat")!.setGrowsWhen([
    {
      sunlevel: 3,
      waterlevel: 2,
      proximity: 1,
    },
    { sunlevel: 5, waterlevel: 3, proximity: 3 },
    {
      sunlevel: 5,
      waterlevel: 4,
      proximity: 5,
    },
  ]),
);

plants.push(
  PlantType.create("Aloe Vera")!.setGrowsWhen([
    {
      sunlevel: 2,
      waterlevel: 1,
      proximity: 0,
    },
    { sunlevel: 4, waterlevel: 2, proximity: 1 },
    {
      sunlevel: 5,
      waterlevel: 2,
      proximity: 2,
    },
  ]),
);

plants.push(
  PlantType.create("Flytrap")!.setGrowsWhen([
    { sunlevel: 3, waterlevel: 1, proximity: 0 },
    {
      sunlevel: 4,
      waterlevel: 3,
      proximity: 0,
    },
    {
      sunlevel: 5,
      waterlevel: 5,
      proximity: 2,
    },
  ]),
);

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

  useEffect(() => {
    gameManager.initGame();
  }, []);

  return (
    <>
      <CellIndexContext.Provider
        value={{ selectedCellIndex, setSelectedCellIndex }}
      >
        <CellContext.Provider value={{ cell, setCell }}>
          <PlantContext.Provider value={{ selectedPlant, setSelectedPlant }}>
            <RenderingEngine plantManager={plantManager} />
            <PlayerController />
            <GameController plantManager={plantManager} />
            <SaveNLoad gameManager={gameManager} />
            <UndoRedo cmdPipe={cmdPipeline} />
            <PlantableUI plantManager={plantManager} />
            <SelectPlantUI plants={plants} />
          </PlantContext.Provider>
        </CellContext.Provider>
      </CellIndexContext.Provider>
    </>
  );
}

export default App;
