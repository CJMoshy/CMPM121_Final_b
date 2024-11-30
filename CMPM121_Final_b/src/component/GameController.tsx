const GameController: React.FC = () => {

    const takeTurn = () => {
        console.log('taking turn')
    }

    const reap = () => {
        console.log('reap')
    }   

    const sow = () => {
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