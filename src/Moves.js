import React from "react";

function Moves({ memory, goTo}) {
    return (
        <ol className="btn-container">
            {memory.map((step, move) => {
                const desc = move ? "Go to move #" + move : "Go to start";
                return (
                    <li key={move}>
                        <button className="move-btn" onClick={() => goTo(move)}>{desc}</button>
                    </li>
                );
            })}
        </ol>
    );
}

export default Moves;
