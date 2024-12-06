import { useContext } from "react";
import { TranslateContext } from "../Context.ts";
import { languageNames, translationObject } from "./translateLanguage.ts";

const Translator: React.FC = () => {
  const {currentLanguage, setLanguage}  = useContext(TranslateContext);
  const handleTranslateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as Language);
  };
    

  const getTranslation = (key: string): string => {
    if (translationObject[currentLanguage] && translationObject[currentLanguage][key]) {
      return translationObject[currentLanguage][key];
    }
    return key;
  };

  return (
    <div className="language-select-ui">
      <h3>{getTranslation("Select a Language")}</h3>
      <form>
        <select id="language" value={currentLanguage} onChange={handleTranslateChange}>
          {languageNames.map((language) => (
            <option key={language.code} value={language.code}>
              {language.displayName}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default Translator; 