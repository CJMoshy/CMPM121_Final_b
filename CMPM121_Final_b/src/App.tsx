import "./App.css";
// @deno-types="@types/react"

import Engine from "./component/RenderingEngine.tsx";
import PlayerController from "./component/PlayerController.tsx";
import GameController from "./component/GameController.tsx"; // react component
import GameManager from "./controller/GameManager.ts"; // ts class that does the lifting
import PlantableUI from "./component/PlantableUI.tsx";
import PlantManager from "./controller/PlantController.ts";
import CommandPipeline from "./util/CommandPipeline.ts";
import { CellContext } from "./Context.ts";
import { useState, useEffect} from "react";


const plantManager = new PlantManager();
const gameManager = new GameManager(plantManager);
const cmdPipeline = new CommandPipeline(gameManager);

function App() {

  const [selectedCell, setSelectedCell] = useState();
  
  useEffect(() => {
    gameManager.initGame()
  },[])


  return (
    <>
        <CellContext.Provider value={{ selectedCell, setSelectedCell }}>
          <Engine plantManager={plantManager}/>
          <PlayerController />
          <GameController />
          <PlantableUI plantManager={plantManager}/>
        </CellContext.Provider>
    </>
  );
}

export default App;
