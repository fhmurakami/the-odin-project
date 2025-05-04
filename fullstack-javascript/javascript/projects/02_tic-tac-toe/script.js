/**
 * GameBoard object
 * @property {Array<string>} board - 9 tiles, each representing a cell in the board
 * @property {function} setBoard - sets the board to its initial state
 * @property {function} setMarker - sets the marker for a given position on the board
 * @property {function} printBoard - prints the current state of the board
 */
const gameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  /**
   * Sets the board to its initial state
   */
  const setBoard = () => {
    board.fill("");
  };

  /**
   * Sets the marker for a given position on the board
   * @param {number} position - the position on the board
   * @param {Object} player - the player object
   * @returns {boolean} - true if the marker was set successfully, false otherwise
   */
  const setMarker = (position, player) => {
    if (board[position] === "") {
      board[position] = player.marker;
      return true;
    } else {
      return false;
    }
  };

  /**
   * Prints the current state of the board
   */
  const printBoard = () => {
    console.log(
      ` ${board[0] == "" ? " " : board[0]} | ${
        board[1] == "" ? " " : board[1]
      } | ${board[2] == "" ? " " : board[2]}\n---+---+---\n ${
        board[3] == "" ? " " : board[3]
      } | ${board[4] == "" ? " " : board[4]} | ${
        board[5] == "" ? " " : board[5]
      }\n---+---+---\n ${board[6] == "" ? " " : board[6]} | ${
        board[7] == "" ? " " : board[7]
      } | ${board[8] == "" ? " " : board[8]}\n`
    );
  };

  return { board, setBoard, setMarker, printBoard };
})();

/**
 * Creates a player object with a name and marker.
 * @param {string} name - The name of the player.
 * @param {string} marker - The marker for the player, typically 'X' or 'O'.
 * @returns {Object} An object representing the player, containing the name and marker properties.
 */

function createPlayer(name, marker) {
  return { name, marker };
}

/**
 * The game controller object
 * @property {function} start - starts the game (clears the board, sets up the players, etc.)
 * @property {function} play - runs the game (prints the board, gets player turn, etc.)
 */
const gameController = (function () {
  /**
   * Starts the game
   */
  const start = () => {
    console.clear();
    console.log("Let's play tic-tac-toe!");

    this.player1 = createPlayer(prompt("First player's name (X): "), "X");
    this.player2 = createPlayer(prompt("Second player's name (O): "), "O");
    this.currentPlayer = this.player1;

    gameBoard.setBoard();
    gameBoard.printBoard();
  };

  /**
   * Runs the game
   */
  const play = () => {
    let currentPosition;
    do {
      do {
        currentPosition = Number(
          prompt(`${this.currentPlayer.name}'s turn. Pick a position (0-8): `)
        );
      } while (
        isNaN(currentPosition) ||
        currentPosition < 0 ||
        currentPosition > 8
      );

      if (playerTurn(currentPosition)) {
        gameBoard.printBoard();

        if (checkWin()) {
          console.log(`${this.currentPlayer.name} wins!`);
        } else if (checkTie()) {
          console.log("It's a tie!");
        } else {
          switchPlayer();
        }
      }
    } while (!checkWin() && !checkTie());
  };

  /**
   * Manages a player's turn
   * @param {number} position - the position on the board
   * @returns {boolean} - true if the turn was successful, false otherwise
   */
  const playerTurn = (position) => {
    if (gameBoard.setMarker(position, this.currentPlayer)) {
      return true;
    } else {
      console.log("Invalid move. Try again.");
      return false;
    }
  };

  /**
   * Checks if there is a winner
   * @returns {boolean} - true if there is a winner, false otherwise
   */
  const checkWin = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (
        gameBoard.board[a] === gameBoard.board[b] &&
        gameBoard.board[a] === gameBoard.board[c] &&
        gameBoard.board[a] !== ""
      ) {
        return true;
      }
    }
    return false;
  };

  /**
   * Checks if there is a tie
   * @returns {boolean} - true if there is a tie, false otherwise
   */
  const checkTie = () => {
    return gameBoard.board.indexOf("") === -1;
  };

  /**
   * Switches the current player
   */
  const switchPlayer = () => {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  };

  return { start, play };
})();

gameController.start();
gameController.play();
