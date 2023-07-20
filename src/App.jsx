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
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
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

    winnerColumn && setIsWin(true);
    winnerRow && setIsWin(true);
    diagonalWinnerFirst && setIsWin(true);
    diagonalWinnerSecond && setIsWin(true);
  };

  const checkColumnForWinner = (updatedBoard, colIndex) => {
    let currentPlayer = null;
    let score = 0;

    updatedBoard[colIndex].forEach((el, i) => {
      if (score >= 4) return;
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

    return score >= 4 ? currentPlayer : null;
  };

  const checkRowForWinner = (updatedBoard, rowIndex) => {
    let currentPlayer = null;
    let score = 0;

    updatedBoard.forEach((column) => {
      const playerId = column[rowIndex];
      if (score >= 4) return;

      if (playerId === null) {
        score = 0;
        currentPlayer = null;
      } else if (currentPlayer === null) {
        currentPlayer = playerId;
        score = 1;
      } else if (currentPlayer === playerId) {
        score++;
      } else {
        currentPlayer = playerId;
        score = 1;
      }
    });

    return score >= 4 ? currentPlayer : null;
  };

  const checkDiagonalFirstWinner = (updatedBoard, colIndex, rowIndex) => {
    const diagonalShift = colIndex - rowIndex;
    const startingColIndex = diagonalShift > 0 ? diagonalShift : 0;
    const startingRowIndex = rowIndex - colIndex > 0 ? diagonalShift : 0;

    let score = 0;
    let currentPlayer = null;

    updatedBoard.forEach((column, index) => {
      if (score >= 4) return;
      if (startingColIndex > index) return;
      if (diagonalShift < 0 && index - diagonalShift > column.length - 1)
        return; // reach border

      if (startingColIndex === index) {
        currentPlayer = column[index - diagonalShift];
        score = currentPlayer !== null ? 1 : 0;
      } else if (startingColIndex < index) {
        if (
          currentPlayer !== null &&
          column[index - diagonalShift] === currentPlayer
        ) {
          score++;
        } else {
          currentPlayer = column[index - diagonalShift];
          score = currentPlayer !== null ? 1 : 0;
        }
      }
    });

    return score >= 4 ? currentPlayer : null;
  };

  const checkDiagonalSecondWinner = (updatedBoard, colIndex, rowIndex) => {
    const shift = colIndex + rowIndex;
    const startingColIndex = colIndex > shift ? colIndex - shift : 0;
    const currentRowIndex = shift - colIndex;

    let score = 0;
    let currentPlayer = null;

    updatedBoard.forEach((column, index) => {
      if (score >= 4) return;
      if (startingColIndex > index) return;
      if (startingColIndex + shift > updatedBoard.length) return; // reach border

      if (startingColIndex === index) {
        currentPlayer = column[shift - index];
        score = currentPlayer !== null ? 1 : 0;
      } else if (startingColIndex < index) {
        if (currentPlayer !== null && column[shift - index] === currentPlayer) {
          score++;
        } else {
          currentPlayer = column[shift - index];
          score = currentPlayer !== null ? 1 : 0;
        }
      }
    });

    return score >= 4 ? currentPlayer : null;
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
