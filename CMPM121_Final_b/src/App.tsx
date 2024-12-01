import "./App.css";
// @deno-types="@types/react"

import RenderingEngine from "./component/RenderingEngine.tsx";
import PlayerController from "./component/PlayerController.tsx";
import GameController from "./component/GameController.tsx"; // react component
import GameManager from "./controller/GameManager.ts"; // ts class that does the lifting
import PlantableUI from "./component/PlantableUI.tsx";
import SelectPlantUI from "./component/SelectPlantUI.tsx";
import SaveNLoad from "./component/SaveNLoad.tsx";
import PlantManager from "./controller/PlantController.ts";
import CommandPipeline from "./util/CommandPipeline.ts";
import { CellContext, CellIndexContext, PlantContext } from "./Context.ts";
import { useEffect, useState } from "react";

const plantManager = new PlantManager();
const gameManager = new GameManager(plantManager);
const cmdPipeline = new CommandPipeline(gameManager);

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
          <PlantContext.Provider value={{selectedPlant, setSelectedPlant}}>
            <RenderingEngine plantManager={plantManager} />
            <PlayerController />
            <GameController plantManager={plantManager}/>
            <SaveNLoad gameManager={gameManager}/>
            <PlantableUI plantManager={plantManager} />
            <SelectPlantUI />
          </PlantContext.Provider>
        </CellContext.Provider>
      </CellIndexContext.Provider>
    </>
  );
}

export default App;
