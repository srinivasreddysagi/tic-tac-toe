import { useState } from "react";
import "./App.css";
import Board from "./Board";

function App() {
    const [data, setData] = useState({
        history: [
            {
                squares: Array(9).fill(null),
            },
            // {
            //     squares: ["X", null, null, null, null, null, null, null, null],
            // },
        ],
        xIsNext: true,
        stepCount: 0,
    });

    // let state = {
    //     history: [
    //         {
    //             squares: Array(9).fill(null),
    //         },
    //         {
    //             squares: Array(9).fill("O"),
    //         },
    //     ],
    //     xIsNext: true,
    //     stepCount: 0,
    // };
    const { history } = data;
    const winner = calculateWinner(data.history[data.stepCount].squares);
    // console.log(data.history);
    const moves = history.map((obj, index) => {
        // console.log(index);
        return (
            <li key={index}>
                <button onClick={goTo(index)}>
                    {index > 0 ? "Move#" + index : "Reset"}
                </button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (data.xIsNext ? "X" : "O");
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
        console.log(data.history);
        // state = {
        //     history: history.concat([
        //         {
        //             squares: squares,
        //         },
        //     ]),
        //     stepCount: history.length,
        //     xIsNext: !state.xIsNext,
        // };
    }

    function goTo(index) {
        setData({
            xIsNext: index % 2 === 0,
            stepCount: index,
        });
        // state = {
        //     xIsNext: index % 2 === 0,
        //     stepCount: index,
        // };
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
                <div>{status}</div>
                <ol className="btn-container">{moves}</ol>
            </div>
        </div>
    );
}

export default App;
