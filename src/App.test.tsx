import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Tic Tac Toe Game', () => {
  // Basic rendering test
  test('renders tic tac toe heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Tic Tac Toe/i);
    expect(headingElement).toBeInTheDocument();
  });

  // Initial state test
  test('initial game state shows player X turn', () => {
    render(<App />);
    const statusElement = screen.getByTestId('status');
    expect(statusElement.textContent).toBe("Player X's turn");
  });

  // Player moves test
  test('clicking an empty cell marks it with X for the first move', () => {
    render(<App />);
    const cell0 = screen.getByTestId('cell-0');
    fireEvent.click(cell0);
    expect(cell0.textContent).toBe('X');
  });

  test('alternates between X and O after each move', () => {
    render(<App />);
    const cell0 = screen.getByTestId('cell-0');
    const cell1 = screen.getByTestId('cell-1');
    const cell2 = screen.getByTestId('cell-2');
    
    // First move - X
    fireEvent.click(cell0);
    expect(cell0.textContent).toBe('X');
    
    // Second move - O
    fireEvent.click(cell1);
    expect(cell1.textContent).toBe('O');
    
    // Third move - X again
    fireEvent.click(cell2);
    expect(cell2.textContent).toBe('X');
  });

  test('cannot click on an already occupied cell', () => {
    render(<App />);
    const cell0 = screen.getByTestId('cell-0');
    const statusElement = screen.getByTestId('status');
    
    // First move - X on cell 0
    fireEvent.click(cell0);
    expect(cell0.textContent).toBe('X');
    
    // Try to click the same cell again
    fireEvent.click(cell0);
    
    // Cell should still contain X, not O
    expect(cell0.textContent).toBe('X');
    
    // Status should still show it's player O's turn
    expect(statusElement.textContent).toBe("Player O's turn");
  });

  // Winning scenarios test
  test('horizontal win scenario - top row', () => {
    render(<App />);
    const cell0 = screen.getByTestId('cell-0');
    const cell1 = screen.getByTestId('cell-1');
    const cell2 = screen.getByTestId('cell-2');
    const cell3 = screen.getByTestId('cell-3');
    const cell4 = screen.getByTestId('cell-4');
    const statusElement = screen.getByTestId('status');
    
    // X plays top-left
    fireEvent.click(cell0);
    // O plays middle-left
    fireEvent.click(cell3);
    // X plays top-middle
    fireEvent.click(cell1);
    // O plays middle-middle
    fireEvent.click(cell4);
    // X plays top-right - should win
    fireEvent.click(cell2);
    
    // Check for winning message - X should be the winner
    expect(statusElement.textContent).toBe('Player X has won!');
  });

  test('vertical win scenario - left column', () => {
    render(<App />);
    const cell0 = screen.getByTestId('cell-0');
    const cell1 = screen.getByTestId('cell-1');
    const cell3 = screen.getByTestId('cell-3');
    const cell4 = screen.getByTestId('cell-4');
    const cell6 = screen.getByTestId('cell-6');
    const statusElement = screen.getByTestId('status');
    
    // X plays top-left
    fireEvent.click(cell0);
    // O plays top-middle
    fireEvent.click(cell1);
    // X plays middle-left
    fireEvent.click(cell3);
    // O plays middle-middle
    fireEvent.click(cell4);
    // X plays bottom-left - should win
    fireEvent.click(cell6);
    
    // Check for winning message - X should be the winner
    expect(statusElement.textContent).toBe('Player X has won!');
  });

  test('diagonal win scenario - top-left to bottom-right', () => {
    render(<App />);
    const cell0 = screen.getByTestId('cell-0');
    const cell1 = screen.getByTestId('cell-1');
    const cell3 = screen.getByTestId('cell-3');
    const cell4 = screen.getByTestId('cell-4');
    const cell8 = screen.getByTestId('cell-8');
    const statusElement = screen.getByTestId('status');
    
    // X plays top-left
    fireEvent.click(cell0);
    // O plays top-middle
    fireEvent.click(cell1);
    // X plays middle-middle
    fireEvent.click(cell4);
    // O plays middle-left
    fireEvent.click(cell3);
    // X plays bottom-right - should win
    fireEvent.click(cell8);
    
    // Check for winning message - X should be the winner
    expect(statusElement.textContent).toBe('Player X has won!');
  });

  test('O player can also win', () => {
    render(<App />);
    const cell0 = screen.getByTestId('cell-0');
    const cell1 = screen.getByTestId('cell-1');
    const cell2 = screen.getByTestId('cell-2');
    const cell4 = screen.getByTestId('cell-4');
		const cell6 = screen.getByTestId('cell-6');
    const cell7 = screen.getByTestId('cell-7');
    const statusElement = screen.getByTestId('status');
    
    // X plays top-left
    fireEvent.click(cell0);
    // O plays middle
    fireEvent.click(cell4);
    // X plays top-middle
    fireEvent.click(cell1);
    // O plays bottom-left
    fireEvent.click(cell6);
    // X plays somewhere else
    fireEvent.click(cell7);
    // O completes a line (diagonal) and wins
    fireEvent.click(cell2);
    
    // Check for winning message - O should be the winner
    expect(statusElement.textContent).toBe('Player O has won!');
  });

  // Draw scenario test
  test('game ends in draw when all cells are filled without a winner', () => {
    render(<App />);
    // Get all cells by their data-testid
    const cell0 = screen.getByTestId('cell-0');
    const cell1 = screen.getByTestId('cell-1');
    const cell2 = screen.getByTestId('cell-2');
    const cell3 = screen.getByTestId('cell-3');
    const cell4 = screen.getByTestId('cell-4');
    const cell5 = screen.getByTestId('cell-5');
    const cell6 = screen.getByTestId('cell-6');
    const cell7 = screen.getByTestId('cell-7');
    const cell8 = screen.getByTestId('cell-8');
    const statusElement = screen.getByTestId('status');
    
    // Play a sequence that leads to a draw
    // X plays center
    fireEvent.click(cell4);
    // O plays top-left
    fireEvent.click(cell0);
    // X plays top-right
    fireEvent.click(cell2);
    // O plays bottom-left
    fireEvent.click(cell6);
    // X plays middle-left
    fireEvent.click(cell3);
    // O plays middle-right
    fireEvent.click(cell5);
    // X plays bottom-right
    fireEvent.click(cell8);
    // O plays bottom-middle
    fireEvent.click(cell7);
    // X plays top-middle
    fireEvent.click(cell1);
    
    // Check for draw message
    expect(statusElement.textContent).toBe('Game ended in a draw!');
  });

  // Game restart functionality test
  test('clicking restart button resets the game', () => {
    render(<App />);
    const cell0 = screen.getByTestId('cell-0');
    const cell1 = screen.getByTestId('cell-1');
    const restartButton = screen.getByTestId('restart-button');
    const statusElement = screen.getByTestId('status');
    
    // Make some moves
    fireEvent.click(cell0); // X
    fireEvent.click(cell1); // O
    
    // Click restart button
    fireEvent.click(restartButton);
    
    // Check that all cells are empty
    for (let i = 0; i < 9; i++) {
      const cell = screen.getByTestId(`cell-${i}`);
      expect(cell.textContent).toBe('');
    }
    
    // Check that status is reset to Player X's turn
    expect(statusElement.textContent).toBe("Player X's turn");
  });

  test('game is unplayable after someone wins until restart', () => {
    render(<App />);
    const cell0 = screen.getByTestId('cell-0');
    const cell1 = screen.getByTestId('cell-1');
    const cell2 = screen.getByTestId('cell-2');
    const cell3 = screen.getByTestId('cell-3');
    const cell4 = screen.getByTestId('cell-4');
    const cell5 = screen.getByTestId('cell-5');
    const restartButton = screen.getByTestId('restart-button');
    const statusElement = screen.getByTestId('status');
    
    // Create a winning scenario for X (top row)
    fireEvent.click(cell0); // X
    fireEvent.click(cell3); // O
    fireEvent.click(cell1); // X
    fireEvent.click(cell4); // O
    fireEvent.click(cell2); // X wins
    
    // Try to make another move
    fireEvent.click(cell5);
    
    // Cell should still be empty
    expect(cell5.textContent).toBe('');
    
    // Win message should still be there
    expect(statusElement.textContent).toBe('Player X has won!');
    
    // Restart the game
    fireEvent.click(restartButton);
    
    // Should be able to play again
    fireEvent.click(cell0);
    expect(cell0.textContent).toBe('X');
  });
});