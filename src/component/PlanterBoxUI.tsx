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
  }

  return (
    <>
      {cell
        ? (
          <>
            <p>{getTranslation("Cell i")}: {cell.i}</p>
            <p>{getTranslation("Cell j")}: {cell.j}</p>
            <p>{getTranslation("Water Level")}: {cell.planterBox.waterLevel}</p>
            <p>{getTranslation("Sun Level")}: {cell.planterBox.sunLevel}</p>
            <p>{getTranslation("Plant Species")}: {cell.planterBox.plant.species}</p>
            <p>{getTranslation("Growth Level")}: {cell.planterBox.plant.growthLevel}</p>
          </>
        )
        : <p>{getTranslation("No Cell Selected")}</p>}
    </>
  );
};

export default PlanterBoxUI;
