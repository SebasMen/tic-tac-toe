import { useState } from "react"
import confetti from "canvas-confetti"

import { TURN } from "./assets/constants"
import { Square, WinnerModal } from "./components"
import { checkWinnerFrom, checkEndGame, saveGameToStorage, resetGameStorage } from "./utils"

function App() {
  const [winner, setWinner] = useState(null)
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURN.X
  })
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board")
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const updateBoard = (index) => {
    // Do not overwrite value
    if (board[index] || winner) return

    // Update board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Change turn
    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)

    // Save game in local storage
    saveGameToStorage({ board: newBoard, turn: newTurn })

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Draw
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)
    resetGameStorage()
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {
          board.map((square, index) => (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          ))
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURN.X}>
          {TURN.X}
        </Square>
        <Square isSelected={turn === TURN.O}>
          {TURN.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
