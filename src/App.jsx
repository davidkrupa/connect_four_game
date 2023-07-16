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
    setBoard((prev) =>
      prev.map((item, index) => {
        if (colId !== index) return item;
        else
          return item.map((el, i) => {
            console.log(el);
            if (el !== null) return el;
            else if (i === item.length - 1)
              return isPlayerOne ? PLAYER1_ID : PLAYER2_ID;
            else if (item[i + 1] !== null)
              return isPlayerOne ? PLAYER1_ID : PLAYER2_ID;
            else return el;
          });
      })
    );
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
