import getTranslation from "./translateLanguage";

const PlayerController: React.FC = () => {
  const handleMove = (_direction: direction) => {
    const event = new CustomEvent("playerMoveEvent", { detail: _direction });
    document.dispatchEvent(event);
  };

  return (
    <div className="player-controls-container">
      <button id="move-up-btn" onClick={() => handleMove("up")}>{getTranslation("Up")}</button>
      <div>
        <button id="move-left-btn" onClick={() => handleMove("left")}>
          {getTranslation("Left")}
        </button>
        <button id="move-down-btn" onClick={() => handleMove("down")}>
          {getTranslation("Down")}
        </button>
        <button id="move-right-btn" onClick={() => handleMove("right")}>
          {getTranslation("Right")}
        </button>
      </div>
    </div>
  );
};

export default PlayerController;
