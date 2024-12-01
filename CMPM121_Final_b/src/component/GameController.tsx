

const GameController: React.FC = () => {

    // const {selectedCell} = useContext(CellContext)

    const takeTurn = () => {
        document.dispatchEvent(new Event('nextTurnEvent'))
    }

    const reap = () => {
        // if(!selectedCell){
        //     console.log('no cell selected')
        // } 
        // console.log(selectedCell)
        console.log('reap')
    }   

    const sow = () => {
        // if(!selectedCell){
        //     console.log('no cell selected')
        // }
        // console.log(selectedCell)
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