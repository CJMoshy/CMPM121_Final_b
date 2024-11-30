// import { useContext } from "react";
// import { DirectionContext } from "../Context.ts";

const PlayerController: React.FC = () => {

    const handleMove = (_direction: direction) => {
        const event = new CustomEvent("playerMoveEvent", { detail: _direction });
        document.dispatchEvent(event)
        // setDirection(_direction)
        // setTimeout(()=>setDirection('none'), 1000)
    }

    return (
        <div className="player-controls-container">
            <button id="move-up-btn" onClick={() => handleMove('up')}>UP</button>
            <button id="move-down-btn" onClick={() => handleMove('down')}>DOWN</button>
            <button id="move-left-btn" onClick={() => handleMove('left')}>LEFT</button>
            <button id="move-right-btn" onClick={() => handleMove('right')}>RIGHT</button>
        </div>
    );
};

export default PlayerController
