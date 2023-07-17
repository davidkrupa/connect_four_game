import { useEffect, useState } from "react";
import Column from "./components/Column";

const ROWS_NUMBER = 6;
const COLUMNS_NUMBER = 7;
export const PLAYER1_ID = "player1";
export const PLAYER2_ID = "player2";

function App() {
  const [board, setBoard] = useState(
    Array(COLUMNS_NUMBER)
      .fill([])
      .map(() => Array(ROWS_NUMBER).fill(null))
  );
  const [isPlayerOne, setIsPlayerOne] = useState(true);

  useEffect(() => {
    setIsPlayerOne((prev) => !prev);
  }, [board]);

  const handleClick = (rowId, colId) => {
    if (board[colId][0] !== null) return;

    let currentPlayer = null;
    let score = 0;

    const updatedBoard = board.map((item, index) => {
      if (colId !== index) return item;
      else
        return item.map((el, i) => {
          if (el !== null) return el;
          else if (i === item.length - 1)
            return isPlayerOne ? PLAYER1_ID : PLAYER2_ID;
          else if (item[i + 1] !== null)
            return isPlayerOne ? PLAYER1_ID : PLAYER2_ID;
          else return el;
        });
    });

    setBoard(updatedBoard);

    updatedBoard[colId].forEach((el, i) => {
      if (score === 4) return;
      if (el === null) return;

      if (currentPlayer === null) {
        currentPlayer = el;
        score = 1;
      } else if (el === currentPlayer) {
        score++;
      } else {
        currentPlayer = el;
        score = 1;
      }
    });
  };

  return (
    <>
      <div className="board">
        {board.map((item, index) => (
          <Column
            key={index}
            elements={board[index]}
            handleClick={handleClick}
            columnIndex={index}
          />
        ))}
      </div>
    </>
  );
}

export default App;
