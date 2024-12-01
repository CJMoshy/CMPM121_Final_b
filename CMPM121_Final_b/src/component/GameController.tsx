import { useContext } from "react";
import { CellContext,PlantContext } from "../Context.ts";

const GameController: React.FC = () => {

    const {selectedCellIndex} = useContext(CellContext)
    const {cell} = useContext(PlantContext)

    const takeTurn = () => {
        document.dispatchEvent(new Event('nextTurnEvent'))
    }

    const reap = () => {
        if(!selectedCellIndex){
            console.log('no cell selected')
            return
        } 
        
        const {plant} = cell.planterBox
        console.log(plant)
        console.log('reap')
    }   

    const sow = () => {
        if(!selectedCellIndex){
            console.log('no cell selected')
            return
        }
        const {plant} = cell.planterBox
        console.log(plant)
        console.log('sow')
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