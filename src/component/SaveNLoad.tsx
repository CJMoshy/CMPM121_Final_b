import { useContext } from "react";
import { TranslateContext } from "../Context.ts";
import type GameManager from "../controller/GameManager.ts";
import getTranslation from "./translateLanguage.ts";

interface SNLComp {
  gameManager: GameManager;
}
const SaveNLoad: React.FC<SNLComp> = ({ gameManager }) => {
  const handleOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    save: boolean,
  ) => {
    const toNum = Number(event.target.value); // what is this??? bad name
    save ? gameManager.savedGameSlot = toNum : gameManager.loadGameSlot = toNum;
    console.log(gameManager.savedGameSlot, gameManager.loadGameSlot);
  };

  const handleSaveLoad = (save: boolean) => {
    save ? gameManager.saveGame() : gameManager.loadSavedGame();
  };

  const { currentLanguage} = useContext(TranslateContext);

  return (
    <div className="save-load-contaier">
      <select
        name="gameSaves"
        id="gameSaves"
        onChange={(e) => handleOnChange(e, true)}
      >
        <option value="1">{getTranslation("Slot 1", currentLanguage)}</option>
        <option value="2">{getTranslation("Slot 2", currentLanguage)}</option>
        <option value="3">{getTranslation("Slot 3", currentLanguage)}</option>
        <option value="4">{getTranslation("Slot 4", currentLanguage)}</option>
      </select>
      <select
        name="gameLoads"
        id="gameLoads"
        onChange={(e) => handleOnChange(e, false)}
      >
        <option value="1">{getTranslation("Slot 1", currentLanguage)}</option>
        <option value="2">{getTranslation("Slot 2", currentLanguage)}</option>
        <option value="3">{getTranslation("Slot 3", currentLanguage)}</option>
        <option value="4">{getTranslation("Slot 4", currentLanguage)}</option>
      </select>
      <button id="saveBtn" onClick={() => handleSaveLoad(true)}>
        {getTranslation("Save", currentLanguage)}
      </button>
      <button id="loadbtn" onClick={() => handleSaveLoad(false)}>
        {getTranslation("Load", currentLanguage)}
      </button>
      <p>
        {getTranslation(
          "Game is automatically saved after every turn, but you can manually save at any point",
          currentLanguage
        )}
      </p>
    </div>
  );
};

export default SaveNLoad;
