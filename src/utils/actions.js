import { WINNER_COMBOS } from "../assets/constants"

export const checkWinnerFrom = (boardToCheck) => {
  // review the possible combinations 
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      // we have a winner
      return boardToCheck[a]
    }
  }

  // No winner
  return null
}

export const checkEndGame = (newBoard) => {
  return newBoard.every(square => square !== null);
}