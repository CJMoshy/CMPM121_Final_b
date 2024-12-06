import { CellContext, CellIndexContext, TranslateContext } from "../Context.ts";
import PlantManager from "../controller/PlantController.ts";
import { useContext, useEffect } from "react";
import getTranslation from "./translateLanguage.ts";

interface BoxUIProps {
  plantManager: PlantManager;
}
const PlanterBoxUI: React.FC<BoxUIProps> = ({ plantManager }) => {
  const { selectedCellIndex } = useContext(CellIndexContext); // Assuming selectedCell is being provided here
  const { cell, setCell } = useContext(CellContext);


  const { currentLanguage} = useContext(TranslateContext);
  useEffect(() => {
    // Update the state whenever selectedCell changes
    if (plantManager.isLoading === false && selectedCellIndex) {
      const allCells = plantManager.getAllPlantableCells();
      // console.log(allCells);
      setCell(allCells.at(selectedCellIndex - 1));
    } else {
      console.log("planterbox is still loading");
    }
    document.addEventListener("updateUI", updateUI);
  }, [selectedCellIndex]); // Re-run when selectedCell or plantManager changes

  const updateUI = () => {
    if (plantManager.isLoading === false) {
      const allCells = plantManager.getAllPlantableCells();
      setCell(allCells.at(selectedCellIndex - 1));
    } else {
      console.log("planterbox is still loading");
    }
  };

  return (
    <>
      {cell
        ? (
          <>
            <p>
              {getTranslation("Cell i", currentLanguage)}: {getTranslation(cell.i.toString(), currentLanguage)}
            </p>
            <p>
              {getTranslation("Cell j", currentLanguage)}: {getTranslation(cell.j.toString(), currentLanguage)}
            </p>
            <p>
              {getTranslation("Water Level", currentLanguage)}:{" "}
              {getTranslation(cell.planterBox.waterLevel.toString(), currentLanguage)}
            </p>
            <p>
              {getTranslation("Sun Level", currentLanguage)}:{" "}
              {getTranslation(cell.planterBox.sunLevel.toString(), currentLanguage)}
            </p>
            <p>
              {getTranslation("Plant Species", currentLanguage)}:{" "}
              {getTranslation(cell.planterBox.plant.species, currentLanguage)}
            </p>
            <p>
              {getTranslation("Growth Level",currentLanguage)}:{" "}
              {getTranslation(cell.planterBox.plant.growthLevel.toString(), currentLanguage)}
            </p>
          </>
        )
        : <p>{getTranslation("No Cell Selected", currentLanguage)}</p>}
    </>
  );
};

export default PlanterBoxUI;
