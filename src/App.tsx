import React, { useState } from 'react';
import './App.css';

// Define the props for Square component
interface SquareProps {
  value: string;
  onClick: () => void;
  index: number;
}

// Define the Square component with types
function Square({ value, onClick, index }: SquareProps): React.ReactElement {
  return (
    <div 
      className={`cell ${value ? value.toLowerCase() : ''}`} 
      onClick={onClick}
      data-testid={`cell-${index}`}
    >
      {value}
    </div>
  );
}

function Board(): React.ReactElement {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameActive, setGameActive] = useState<boolean>(true);

  // Type for winning conditions
  const winningConditions: number[][] = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6]  // diagonal
  ];

  // Handle click on a square
  const handleClick = (index: number): void => {
    if (squares[index] || !gameActive) {
      return;
    }

    const newSquares: string[] = [...squares];
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    
    // Check for winner
    if (checkWinner(newSquares)) {
      setGameActive(false);
      return;
    }

    // Check for draw
    if (!newSquares.includes('')) {
      setGameActive(false);
      return;
    }

    setIsXNext(!isXNext);
  };

  // Check if there's a winner
  const checkWinner = (currentSquares: string[]): boolean => {
    for (let i: number = 0; i < winningConditions.length; i++) {
      const [a, b, c]: number[] = winningConditions[i];
      if (
        currentSquares[a] &&
        currentSquares[a] === currentSquares[b] &&
        currentSquares[a] === currentSquares[c]
      ) {
        return true;
      }
    }
    return false;
  };

  // Reset the game
  const restartGame = (): void => {
    setSquares(Array(9).fill(''));
    setIsXNext(true);
    setGameActive(true);
  };

  // Get game status message
  const getStatus = (): string => {
    const winner: boolean = checkWinner(squares);
    
    if (winner) {
      // When a player wins, it's the current player who made the winning move
      // so we use the current value of isXNext to determine who won
      return `Player ${isXNext ? 'X' : 'O'} has won!`;
    } else if (!squares.includes('')) {
      return 'Game ended in a draw!';
    } else {
      return `Player ${isXNext ? 'X' : 'O'}'s turn`;
    }
  };

  // Render the board
  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div id="status" data-testid="status">{getStatus()}</div>
      <div className="board">
        {squares.map((value: string, index: number) => (
          <Square 
            key={index} 
            value={value} 
            onClick={() => handleClick(index)}
            index={index}
          />
        ))}
      </div>
      <button onClick={restartGame} data-testid="restart-button">Restart Game</button>
    </div>
  );
}

function App(): React.ReactElement {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
