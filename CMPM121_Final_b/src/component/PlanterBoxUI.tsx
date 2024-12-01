import { useContext } from "react";
import { CellContext } from "../Context.ts";
import PlantManager from "../controller/PlantController.ts";
import { useEffect, useState } from "react";

interface BoxUIProps {
    plantManager: PlantManager;
}
const PlanterBoxUI: React.FC<BoxUIProps> = ({ plantManager }) => {
    const { selectedCell } = useContext(CellContext); // Assuming selectedCell is being provided here

    // Use state to store the cell
    const [cell, setCell] = useState<Cell | undefined>(undefined);
    useEffect(() => {
        // Update the state whenever selectedCell changes
        if(plantManager.isLoading === false){
            const allCells = plantManager.getAllPlantableCells()
            console.log(allCells)
            setCell(allCells.at(selectedCell - 1))
        } else {
            console.log('planterbox is still loading')
        }
   
    }, [selectedCell]); // Re-run when selectedCell or plantManager changes

    return (
        <>
            {cell
                ? (
                    <>
                        <p>Cell i: {cell.i}</p>
                        <p>Cell j: {cell.j}</p>
                        <p>Water Level {cell.planterBox.waterLevel}</p>
                        <p>Sun Level {cell.planterBox.sunLevel}</p>
                        <p>Plant Species: {cell.planterBox.plant.species}</p>
                        <p>Growth Level: {cell.planterBox.plant.growthLevel}</p>
                    </>
                )
                : <p>No cell selected</p>}
        </>
    );
};

export default PlanterBoxUI;
