import { useContext, useEffect } from "react";
import { TranslateContext, TurnContext } from "../Context.ts";
import {
  getStringTranslation,
} from "../util/TranslateLanguage.ts";
import GameManager from "../controller/GameManager.ts";

interface TurnDisplayProps {
  gameManager: GameManager;
}
const GameTurnDisplay: React.FC<TurnDisplayProps> = ({ gameManager }) => {
  const { currentTurn, setCurrentTurn } = useContext(TurnContext);
  const { currentLanguage } = useContext(TranslateContext);

  useEffect(() => {
    document.addEventListener("updateUI", () => {
      setCurrentTurn(gameManager.turnCounter);
    });

    document.addEventListener("newGameEvent", () => {
      setCurrentTurn(0);
    });
  }, []);
  return (
    <div className="game-turn-display">
      <p>
        {getStringTranslation("Current Turn", currentLanguage)}{" "}
        {currentTurn}
      </p>
    </div>
  );
};

export default GameTurnDisplay;
