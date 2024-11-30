import "./App.css";
// @deno-types="@types/react"

import Engine from "./component/RenderingEngine.tsx";
import PlayerController from "./component/PlayerController.tsx";
import { DirectionContext } from "./Context.ts";
import { useState } from "react";

function App() {
  const [direction, setDirection] = useState("");

  return (
    <>
      <DirectionContext.Provider value={{ direction, setDirection }}>
        <Engine />
        <PlayerController />
      </DirectionContext.Provider>
    </>
  );
}

export default App;
