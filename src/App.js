import { useState } from "react";
import "./App.css";
import Board from "./Board";
import Moves from "./Moves";

function App() {
    const [data, setData] = useState({
        history: [
            {
                squares: Array(9).fill(null),
            },
        ],
        xIsNext: true,
        stepCount: 0,
    });

    function handleClick(i) {
        const history = data.history.slice(0, data.stepCount + 1);
        const squares = history[history.length - 1].squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = data.xIsNext ? "X" : "O";
        setData({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            stepCount: history.length,
            xIsNext: !data.xIsNext,
        });
    }

    function goTo(step) {
        console.log(step);
        setData({
            history: data.history,
            xIsNext: step % 2 === 0,
            stepCount: step,
        });
    }

    const { history, stepCount } = data;
    const winner = calculateWinner(history[stepCount].squares);

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (data.xIsNext ? "X" : "O");
    }

    return (
        <div className="game-main">
            <div className="game">
                <Board
                    squares={data.history[data.stepCount].squares}
                    onClick={(i) => {
                        handleClick(i);
                    }}
                />
            </div>
            <div className="travel">
                <div className="status">{status}</div>
                <Moves memory={history} goTo={goTo}></Moves>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

export default App;
