import { useContext } from "react";
import { TranslateContext } from "../Context.ts";
import type GameManager from "../controller/GameManager.ts";
import type CommandPipeline from "../util/CommandPipeline/CommandPipeline.ts";
import {
  getStringTranslation,
} from "../util/TranslateLanguage.ts";

interface SNLComp {
  gameManager: GameManager;
  cmdPipeline: CommandPipeline;
}
const SaveNLoad: React.FC<SNLComp> = ({ gameManager, cmdPipeline }) => {
  const handleOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    save: boolean,
  ) => {
    const toNum = Number(event.target.value); // what is this??? bad name
    save ? gameManager.savedGameSlot = toNum : gameManager.loadGameSlot = toNum;
  };

  const handleSaveLoad = (save: boolean) => {
    if (save) {
      gameManager.saveGame();
      cmdPipeline.saveToLocalStorage();
    } else {
      gameManager.loadSavedGame();
      cmdPipeline.loadFromLocalStorage();
    }
  };

  const { currentLanguage } = useContext(TranslateContext);
  const SAVESLOTS = [1, 2, 3, 4];

  return (
    <div className="save-load-container">
      <select
        name="gameSaves"
        id="gameSaves"
        onChange={(e) => handleOnChange(e, true)}
      >
        {
          /*simple runthrough: takes 1 from list [1,2,3,4] sets the option, key, and slot equal to 1.
        React needs a key prop for each child in a list as well which is why the key needs to be filled in.*/
        }
        {SAVESLOTS.map((slot) => (
          <option value={slot} key={slot}>
            {getStringTranslation("Slot", currentLanguage)}{" "}
            {slot}
          </option>
        ))}
      </select>
      <select
        name="gameLoads"
        id="gameLoads"
        onChange={(e) => handleOnChange(e, false)}
      >
        {SAVESLOTS.map((slot) => (
          <option value={slot} key={slot}>
            {getStringTranslation("Slot", currentLanguage)}{" "}
            {slot}
          </option>
        ))}
      </select>
      <button id="saveBtn" onClick={() => handleSaveLoad(true)}>
        {getStringTranslation("Save", currentLanguage)}
      </button>
      <button id="loadbtn" onClick={() => handleSaveLoad(false)}>
        {getStringTranslation("Load", currentLanguage)}
      </button>
      <p>
        {getStringTranslation(
          "Game is automatically saved after every turn, but you can manually save at any point",
          currentLanguage,
        )}
      </p>
    </div>
  );
};

export default SaveNLoad;
