function Square(props) {
    return <button className="btn-sq" onClick={props.onClick}>{props.value}</button>;
}

export default function Board(props) {
    function renderSquare(i) {
        return (
            <Square
                value={props.squares[i]}
                onClick={() => {
                    props.onClick(i);
                }}
            />
        );
    }

    return (
        <div className="board">
            <div className="row row-1">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="row row-2">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="row row-3">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}
