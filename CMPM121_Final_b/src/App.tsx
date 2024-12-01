import "./App.css";
// @deno-types="@types/react"

import RenderingEngine from "./component/RenderingEngine.tsx";
import PlayerController from "./component/PlayerController.tsx";
import GameController from "./component/GameController.tsx"; // react component
import GameManager from "./controller/GameManager.ts"; // ts class that does the lifting
import PlantableUI from "./component/PlantableUI.tsx";
import PlantManager from "./controller/PlantController.ts";
import CommandPipeline from "./util/CommandPipeline.ts";
import { CellContext, PlantContext } from "./Context.ts";
import { useState, useEffect} from "react";


const plantManager = new PlantManager();
const gameManager = new GameManager(plantManager);
const cmdPipeline = new CommandPipeline(gameManager);

function App() {

  const [selectedCellIndex, setSelectedCellIndex] = useState<number | undefined>(undefined);
   // Use state to store the cell
  const [cell, setCell] = useState<Cell | undefined>(undefined);

  useEffect(() => {
    gameManager.initGame()
  },[])


  return (
    <>
        <CellContext.Provider value={{ selectedCellIndex, setSelectedCellIndex }}>
        <PlantContext.Provider value={{cell, setCell}}>
          <RenderingEngine plantManager={plantManager}/>
          <PlayerController />
          <GameController />
          <PlantableUI plantManager={plantManager}/>
          </PlantContext.Provider>
        </CellContext.Provider>
    </>
  );
}

export default App;
