import { useContext } from "react";
import { TranslateContext } from "../Context.ts";
import { languageNames } from "./translateLanguage.ts";
import getTranslation from "./translateLanguage.ts";

const Translator: React.FC = () => {
  const { currentLanguage, setLanguage } = useContext(TranslateContext);
  const handleTranslateChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setLanguage(event.target.value as Language);
  };

  return (
    <div className="language-select-ui">
      <h3>{getTranslation("Select a Language", currentLanguage)}</h3>
      <form>
        <select
          id="language"
          value={currentLanguage}
          onChange={handleTranslateChange}
        >
          {languageNames.map((language) => (
            <option key={language.code} value={language.code}>
              {language.displayName}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Translator;
