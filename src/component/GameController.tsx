import { useContext } from "react";
import {
  CellContext,
  CellIndexContext,
  PlantContext,
  TranslateContext,
} from "../Context.ts";
import type PlantManager from "../controller/PlantController.ts";
import getTranslation from "../util/TranslateLanguage.ts";

interface GCProps {
  plantManager: PlantManager;
}
const GameController: React.FC<GCProps> = ({ plantManager }) => {
  const { selectedCellIndex } = useContext(CellIndexContext);
  const { cell, setCell } = useContext(CellContext);
  const { selectedPlant } = useContext(PlantContext);
  const { currentLanguage } = useContext(TranslateContext);

  const takeTurn = () => { // fix this
    document.dispatchEvent(new Event("gameStateAdvance"));
    document.dispatchEvent(new Event("nextTurnEvent"));
    document.dispatchEvent(new Event("updateUI"));
  };

  const reap = () => {
    document.dispatchEvent(new Event("gameStateAdvance"));
    if (!selectedCellIndex || !cell) {
      console.log("No cell selected");
      return;
    }

    if (cell.planterBox.plant.species === "none") {
      return;
    }

    // create a deep copy of the cell and then set the state back to empty
    const newCell = {
      ...cell,
      planterBox: {
        ...cell.planterBox,
        // Reset plant to "blank"
        plant: { species: "none", growthLevel: 0 },
      },
    };
    setCell(newCell);
    console.log(selectedCellIndex, newCell);
    plantManager.addPlantableCell(selectedCellIndex - 1, newCell);
    console.log("plant cleared (reap)");
  };

  const sow = () => {
    document.dispatchEvent(new Event("gameStateAdvance"));
    if (!selectedCellIndex || !cell) {
      console.log("No cell selected");
      return;
    }

    if (!selectedPlant) {
      console.log("No plant species selected.");
      return;
    }

    if (cell.planterBox.plant.species !== "none") {
      console.log("already a plant here");
      return;
    }

    // Set the selected plant in the planter box
    const newCell = {
      ...cell,
      planterBox: {
        ...cell.planterBox,
        plant: { species: selectedPlant, growthLevel: 0 },
      },
    };
    setCell(newCell);
    console.log(selectedCellIndex, newCell);
    plantManager.addPlantableCell(selectedCellIndex - 1, newCell);
    console.log("plant sowed:", selectedPlant);
  };

  return (
    <div className="game-controller-container">
      <button id="nextTurn" onClick={takeTurn}>
        {getTranslation("Next Turn", currentLanguage)}
      </button>
      <button id="reapBtn" onClick={reap}>
        {getTranslation("Reap", currentLanguage)}
      </button>
      <button id="sowBtn" onClick={sow}>
        {getTranslation("Sow", currentLanguage)}
      </button>
    </div>
  );
};

export default GameController;
