import React from "react";
import { PLAYER1_ID, PLAYER2_ID } from "../App";

const Column = ({ elements, handleClick, columnIndex }) => {
  const playerStyle = {
    [PLAYER1_ID]: "player-1",
    [PLAYER2_ID]: "player-2",
  };

  return (
    <div className="column">
      {elements.map((item, index) => (
        <div
          className="tile"
          key={index}
          onClick={() => handleClick(columnIndex)}
        >
          {item !== null && (
            <div className={`player ${playerStyle[item]}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Column;
