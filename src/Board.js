function Board() {
    return (
        <div>
            <div>
                <Square />
                <Square />
                <Square />
            </div>
            <div>
                <Square />
                <Square />
                <Square />
            </div>
            <div>
                <Square />
                <Square />
                <Square />
            </div>
        </div>
    );
}

function Square() {
    return(
        <button type="submit">X</button>
    )
}

export default Board;