import React from 'react'
import FirstHalf from './FirstHalf'
import MidHalf from './MidHalf'
import "./board.css"
import LastHalf from './LastHalf'

function Game() {
  return (
    <div class="game-board-container">
      <div className="game-board">
        <FirstHalf />
        <MidHalf/>
        <LastHalf/>
      </div>
    </div>
  )
}

export default Game