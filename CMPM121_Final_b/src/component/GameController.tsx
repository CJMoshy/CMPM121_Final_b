import { useContext } from "react";
import { CellContext, PlantContext } from "../Context.ts";

const GameController: React.FC = () => {

    const { selectedCellIndex } = useContext(CellContext)
    const { cell, setCell } = useContext(PlantContext)


    const takeTurn = () => {
        document.dispatchEvent(new Event('nextTurnEvent'))
    }

    const reap = () => {
        if (!selectedCellIndex || !cell) {
            console.log("No cell selected");
            return;
        }

        if (cell.planterBox.plant.species === "none") {
            return;
        }

        // create a deep copy of the cell and then set the state back to empty
        setCell({
            ...cell,
            planterBox: {
                ...cell.planterBox,
                // Reset plant to "blank"
                plant: { species: "none", growthLevel: 0 },
            },
        });
        console.log("plant cleared (reap)");
    }

    const sow = () => {
        if (!selectedCellIndex || !cell) {
            console.log("No cell selected");
            return;
        }

        // Find the selected plant from the dropdown
        const plantDropdown = document.getElementById(
            "plants"
        ) as HTMLSelectElement;

        const selectedPlant = plantDropdown.value as string;

        if (!selectedPlant) {
            console.log("No plant species selected.");
            return;
        }

        // Set the selected plant in the planter box
        setCell({
            ...cell,
            planterBox: {
                ...cell.planterBox,
                plant: { species: selectedPlant, growthLevel: 0 },
            },
        });

        console.log("plant sowed:", selectedPlant);
    }

    return (
        <div className="game-controller-container">
            <button id="nextTurn" onClick={takeTurn}>Next Turn</button>
            <button id="reapBtn" onClick={reap}>Reap</button>
            <button id="sowBtn" onClick={sow}>Sow</button>
        </div>
    );
};

export default GameController