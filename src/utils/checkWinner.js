const checkColumnForWinner = (updatedBoard, colIndex) => {
  let currentPlayer = null;
  let score = 0;

  updatedBoard[colIndex].forEach((el) => {
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

  let score = 0;
  let currentPlayer = null;

  updatedBoard.forEach((column, index) => {
    if (score >= 4) return;
    if (startingColIndex > index) return;
    if (diagonalShift < 0 && index - diagonalShift > column.length - 1) return; // reach border

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

export {
  checkColumnForWinner,
  checkRowForWinner,
  checkDiagonalFirstWinner,
  checkDiagonalSecondWinner,
};
