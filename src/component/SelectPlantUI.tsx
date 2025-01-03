import { useContext } from "react";
import { PlantContext, TranslateContext } from "../Context.ts";
import PlantType from "../util/DSL/PlantDSL.ts";
import { getStringTranslation } from "../util/TranslateLanguage.ts";

interface SelectPlantUIProp {
  plants: PlantType[];
}

const SelectPlantUI: React.FC<SelectPlantUIProp> = ({ plants }) => {
  const { selectedPlant, setSelectedPlant } = useContext(PlantContext);
  const { currentLanguage } = useContext(TranslateContext);
  const handlePlantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlant(event.target.value as PlantSpecies);
  };

  const getPlantTypesAsHTML = () => {
    return (
      <>
        <option value="">
          -- {getStringTranslation("Select a plant species", currentLanguage)}
          {" "}
          --
        </option>
        {plants.map((element: PlantType) => (
          <option key={element.plantType} value={element.plantType}>
            {getStringTranslation(element.plantType, currentLanguage)}
          </option>
        ))}
      </>
    );
  };
  return (
    <div className="plant-select-ui">
      <h3>{getStringTranslation("Plant Species", currentLanguage)}</h3>
      <form>
        <select id="plants" value={selectedPlant} onChange={handlePlantChange}>
          {getPlantTypesAsHTML()}
        </select>
      </form>
    </div>
  );
};

export default SelectPlantUI;
