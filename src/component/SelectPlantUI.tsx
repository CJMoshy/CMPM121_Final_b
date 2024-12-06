import { useContext } from "react";
import { PlantContext } from "../Context.ts";
import PlantType from "../util/PlantDSL.ts";
import getTranslation from "./translateLanguage.ts";

interface SelectPlantUIProp {
  plants: PlantType[];
}

const SelectPlantUI: React.FC<SelectPlantUIProp> = ({ plants }) => {
  const { selectedPlant, setSelectedPlant } = useContext(PlantContext);
  const handlePlantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlant(event.target.value as PlantSpecies);
  };

  const getPlantTypesAsHTML = () => {
    return (
      <>
        <option value="">
          -- {getTranslation("Select a plant species")} --
        </option>
        {plants.map((element: PlantType) => (
          <option key={element.plantType} value={element.plantType}>
            {element.plantType}
          </option>
        ))}
      </>
    );
  };
  return (
    <div className="plant-select-ui">
      <h3>{getTranslation("Plant Species")}</h3>
      <form>
        <select id="plants" value={selectedPlant} onChange={handlePlantChange}>
          {getPlantTypesAsHTML()}
        </select>
      </form>
    </div>
  );
};

export default SelectPlantUI;
