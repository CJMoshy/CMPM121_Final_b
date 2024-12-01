import { CellContext, PlantContext } from "../Context.ts";
import PlantManager from "../controller/PlantController.ts";
import { useEffect, useContext} from "react";

interface BoxUIProps {
    plantManager: PlantManager;
}
const PlanterBoxUI: React.FC<BoxUIProps> = ({ plantManager }) => {
    const { selectedCellIndex } = useContext(CellContext); // Assuming selectedCell is being provided here
    const {cell, setCell} = useContext(PlantContext)

    useEffect(() => {
        // Update the state whenever selectedCell changes
        if(plantManager.isLoading === false){
            const allCells = plantManager.getAllPlantableCells()
            console.log(allCells)
            setCell(allCells.at(selectedCellIndex - 1))
        } else {
            console.log('planterbox is still loading')
        }
   
    }, [selectedCellIndex]); // Re-run when selectedCell or plantManager changes

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
