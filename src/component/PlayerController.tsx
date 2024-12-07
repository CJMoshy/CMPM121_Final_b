import { useContext } from "react";
import { TranslateContext } from "../Context.ts";
import getTranslation from "../util/TranslateLanguage.ts";

const PlayerController: React.FC = () => {
  const handleMove = (_direction: direction) => {
    const event = new CustomEvent("playerMoveEvent", { detail: _direction });
    document.dispatchEvent(event);
  };

  const { currentLanguage } = useContext(TranslateContext);

  return (
    <div className="player-controls-container">
      <button id="move-up-btn" onClick={() => handleMove("up")}>
        {getTranslation("Up", currentLanguage)}
      </button>
      <div>
        <button id="move-left-btn" onClick={() => handleMove("left")}>
          {getTranslation("Left", currentLanguage)}
        </button>
        <button id="move-down-btn" onClick={() => handleMove("down")}>
          {getTranslation("Down", currentLanguage)}
        </button>
        <button id="move-right-btn" onClick={() => handleMove("right")}>
          {getTranslation("Right", currentLanguage)}
        </button>
      </div>
    </div>
  );
};

export default PlayerController;
