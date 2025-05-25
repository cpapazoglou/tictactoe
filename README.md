# Tic Tac Toe Game

This is a web-based Tic Tac Toe game built with React and TypeScript. It allows two players to play the classic game in their browser.

## How to Play

Tic Tac Toe is a classic game for two players, X and O.

1.  The game is played on a grid that's 3 squares by 3 squares.
2.  Player X goes first. Players take turns putting their marks (X or O) in empty squares.
3.  The first player to get 3 of their marks in a row (up, down, across, or diagonally) is the winner.
4.  When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.

## Features

*   **Interactive Game Board:** Click on the squares to place your mark.
*   **Current Player Indicator:** Clearly shows whose turn it is (X or O).
*   **Win and Draw Detection:** Automatically detects and announces if a player has won or if the game is a draw.
*   **Restart Game:** A button to easily reset the board and start a new game.

## Technical Overview

This project is built using modern web technologies:

*   **React:** A JavaScript library for building user interfaces. The game board and components are built using React.
*   **TypeScript:** A superset of JavaScript that adds static typing, helping to catch errors early and improve code maintainability.
*   **Create React App:** The project was bootstrapped using Create React App, which provides a pre-configured development environment.

The main application logic can be found in `src/App.tsx`. Static assets like the `index.html` template and icons are located in the `public` directory.

## Deployment

This project is automatically built and deployed to GitHub Pages.

You can play the live game here: [https://cpapazoglou.github.io/tictactoe](https://cpapazoglou.github.io/tictactoe)

## Development

To set up the project for local development:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/cpapazoglou/tictactoe.git
    cd tictactoe
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Available Scripts

In the project directory, you can run:

*   `npm start`
    *   Runs the app in development mode.
    *   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
    *   The page will reload when you make changes.
    *   You may also see any lint errors in the console.

*   `npm test`
    *   Launches the test runner in interactive watch mode.
    *   See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

*   `npm run build`
    *   Builds the app for production to the `build` folder.
    *   It correctly bundles React in production mode and optimizes the build for the best performance.
    *   The build is minified and the filenames include hashes.
    *   Your app is ready to be deployed!
    *   See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deployment (Manual)

This project uses `gh-pages` to deploy the `build` directory to the `gh-pages` branch on GitHub, which is then served by GitHub Pages.

To deploy manually:

1.  **Build the project:**
    ```bash
    npm run build
    ```
    This command creates a `build` directory with the production-ready version of your app.

2.  **Deploy to GitHub Pages:**
    ```bash
    npm run deploy
    ```
    This command will push the contents of the `build` directory to the `gh-pages` branch of your repository. Ensure your `package.json` `homepage` field is set correctly for GitHub Pages to serve your site from the correct URL.
