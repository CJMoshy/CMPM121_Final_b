import { CellContext, CellIndexContext } from "../Context.ts";
import PlantManager from "../controller/PlantController.ts";
import { useContext, useEffect } from "react";
import getTranslation from "./translateLanguage.ts";

interface BoxUIProps {
  plantManager: PlantManager;
}
const PlanterBoxUI: React.FC<BoxUIProps> = ({ plantManager }) => {
  const { selectedCellIndex } = useContext(CellIndexContext); // Assuming selectedCell is being provided here
  const { cell, setCell } = useContext(CellContext);

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
              {getTranslation("Cell i")}: {getTranslation(cell.i.toString())}
            </p>
            <p>
              {getTranslation("Cell j")}: {getTranslation(cell.j.toString())}
            </p>
            <p>
              {getTranslation("Water Level")}:{" "}
              {getTranslation(cell.planterBox.waterLevel.toString())}
            </p>
            <p>
              {getTranslation("Sun Level")}:{" "}
              {getTranslation(cell.planterBox.sunLevel.toString())}
            </p>
            <p>
              {getTranslation("Plant Species")}:{" "}
              {getTranslation(cell.planterBox.plant.species.toString())}
            </p>
            <p>
              {getTranslation("Growth Level")}:{" "}
              {getTranslation(cell.planterBox.plant.growthLevel.toString())}
            </p>
          </>
        )
        : <p>{getTranslation("No Cell Selected")}</p>}
    </>
  );
};

export default PlanterBoxUI;
