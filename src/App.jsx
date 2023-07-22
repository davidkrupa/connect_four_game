import { useEffect, useState } from "react";
import Column from "./components/Column";
import {
  checkColumnForWinner,
  checkRowForWinner,
  checkDiagonalFirstWinner,
  checkDiagonalSecondWinner,
} from "./utils/checkWinner";

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
  const [isWin, setIsWin] = useState(false);
  const [isEndWitoutWinner, setIsEndWitoutWinner] = useState(false);

  useEffect(() => {
    if (isWin) return;
    if (board.every((column) => column.every((el) => el === null))) return;
    if (board.every((column) => column.every((el) => el !== null)) && !isWin) {
      setIsEndWitoutWinner(true);
      return;
    }
    setIsPlayerOne((prev) => !prev);
  }, [board]);

  const handleClick = (colId) => {
    if (isWin) return;
    if (board[colId][0] !== null) return;

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

    const newElemIndex = updatedBoard[colId].findIndex((el) => el !== null);

    setBoard(updatedBoard);

    const winnerColumn = checkColumnForWinner(updatedBoard, colId);
    const winnerRow = checkRowForWinner(updatedBoard, newElemIndex);
    const diagonalWinnerFirst = checkDiagonalFirstWinner(
      updatedBoard,
      colId,
      newElemIndex
    );
    const diagonalWinnerSecond = checkDiagonalSecondWinner(
      updatedBoard,
      colId,
      newElemIndex
    );

    if (
      winnerColumn ||
      winnerRow ||
      diagonalWinnerFirst ||
      diagonalWinnerSecond
    ) {
      setIsWin(true);
    }
  };

  const handleRestart = () => {
    setBoard((column) => column.map((row) => row.map(() => null)));
    setIsPlayerOne(true);
    setIsWin(false);
    setIsEndWitoutWinner(false);
  };

  return (
    <>
      {isWin && <h1>Player {isPlayerOne ? "1" : "2"} Wins</h1>}
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
      {(isWin || isEndWitoutWinner) && (
        <button
          onClick={() => {
            handleRestart();
          }}
        >
          Restart
        </button>
      )}
    </>
  );
}

export default App;
