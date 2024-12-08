import { CellContext, CellIndexContext, TranslateContext } from "../Context.ts";
import PlantManager from "../controller/PlantController.ts";
import { useContext, useEffect } from "react";
import {
  getNumberTranslation,
  getStringTranslation,
} from "../util/TranslateLanguage.ts";

interface BoxUIProps {
  plantManager: PlantManager;
}
const PlanterBoxUI: React.FC<BoxUIProps> = ({ plantManager }) => {
  const { selectedCellIndex } = useContext(CellIndexContext); // Assuming selectedCell is being provided here
  const { cell, setCell } = useContext(CellContext);

  const { currentLanguage } = useContext(TranslateContext);

  useEffect(() => {
    // Update the state whenever selectedCell changes
    updateUI();
    document.addEventListener("updateUI", () => {
      updateUI();
    });
  }, [selectedCellIndex]);

  const updateUI = () => {
    if (plantManager.isLoading === false && selectedCellIndex) {
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
              {getStringTranslation("Cell i", currentLanguage)}:{" "}
              {getNumberTranslation(cell.i, currentLanguage)}
            </p>
            <p>
              {getStringTranslation("Cell j", currentLanguage)}:{" "}
              {getNumberTranslation(cell.j, currentLanguage)}
            </p>
            <p>
              {getStringTranslation("Water Level", currentLanguage)}:{" "}
              {getNumberTranslation(
                cell.planterBox.waterLevel,
                currentLanguage,
              )}
            </p>
            <p>
              {getStringTranslation("Sun Level", currentLanguage)}:{" "}
              {getNumberTranslation(
                cell.planterBox.sunLevel,
                currentLanguage,
              )}
            </p>
            <p>
              {getStringTranslation("Plant Species", currentLanguage)}:{" "}
              {getStringTranslation(
                cell.planterBox.plant.species,
                currentLanguage,
              )}
            </p>
            <p>
              {getStringTranslation("Growth Level", currentLanguage)}:{" "}
              {getNumberTranslation(
                cell.planterBox.plant.growthLevel,
                currentLanguage,
              )}
            </p>
          </>
        )
        : <p>{getStringTranslation("No Cell Selected", currentLanguage)}</p>}
    </>
  );
};

export default PlanterBoxUI;
