import { useContext, useEffect } from "react";
import { LevelContext, TranslateContext } from "../Context.ts";
import getTranslation from "../util/TranslateLanguage.ts";
import GameManager from "../controller/GameManager.ts";

interface WinDisplayProps {
  gameManager: GameManager;
}
const GameWinDisplay: React.FC<WinDisplayProps> = ({ gameManager }) => {
  const { currentLevel, setCurrentLevel } = useContext(LevelContext);
  const { currentLanguage } = useContext(TranslateContext);

  useEffect(() => {
    document.addEventListener("updateUI", () => {
      setCurrentLevel(gameManager.currentLevel);
    });

    document.addEventListener("newGameEvent", () => {
      setCurrentLevel(1);
    });
  });
  return (
    <div className="game-win-display">
      <p>
        {getTranslation("Current Level", currentLanguage)}{" "}
        {getTranslation(currentLevel.toString(), currentLanguage)}
      </p>
    </div>
  );
};

export default GameWinDisplay;
