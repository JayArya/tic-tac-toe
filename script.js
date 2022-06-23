const xControl = document.getElementById("x-control");
const oControl = document.getElementById("o-control");
const finalResultModal = document.querySelector(".final-result-modal");

let moveCounter = 0;
const Gameboard = (() => {
  const gameboard = [];
  for (let i = 0; i < 9; i++) {
    gameboard[i] = i;
  }

  let winner = null;

  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      gameboard[i] = i;
      document.querySelector(`[data-grid-cell="${i}"]`).innerHTML = "";
    }
    winner = null;
    oControl.classList.remove("turn");
    oControl.classList.add("not-turn");
    xControl.classList.add("turn");
    xControl.classList.remove("not-turn");
  };

  const checkResult = () => {
    if (gameboard[0] === gameboard[3] && gameboard[0] === gameboard[6])
      winner = gameboard[0];
    else if (gameboard[1] === gameboard[4] && gameboard[1] === gameboard[7])
      winner = gameboard[1];
    else if (gameboard[2] === gameboard[5] && gameboard[2] === gameboard[8])
      winner = gameboard[2];
    else if (gameboard[0] === gameboard[1] && gameboard[0] === gameboard[2])
      winner = gameboard[0];
    else if (gameboard[3] === gameboard[4] && gameboard[3] === gameboard[5])
      winner = gameboard[3];
    else if (gameboard[6] === gameboard[7] && gameboard[6] === gameboard[8])
      winner = gameboard[6];
    else if (gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8])
      winner = gameboard[0];
    else if (gameboard[2] === gameboard[4] && gameboard[2] === gameboard[6])
      winner = gameboard[2];
  };

  const updateBoard = (index, symbol) => {
    if (
      gameboard[index] === "X" ||
      gameboard[index] === "O" ||
      winner !== null
    ) {
      return;
    } else {
      gameboard[index] = symbol;
      document.querySelector(`[data-grid-cell="${index}"]`).innerHTML = symbol;
      updateTurns();
      moveCounter++;
      checkResult();
      if (winner !== null) {
        const finalResult = document.querySelector(".final-result");
        finalResult.textContent = `${winner} wins 🎉`;
        finalResultModal.style.display = "flex";
      }
    }
  };

  const updateTurns = () => {
    if (moveCounter < 9) {
      if (moveCounter % 2 === 0) {
        xControl.classList.remove("turn");
        xControl.classList.add("not-turn");
        oControl.classList.add("turn");
        oControl.classList.remove("not-turn");
      } else {
        oControl.classList.remove("turn");
        oControl.classList.add("not-turn");
        xControl.classList.add("turn");
        xControl.classList.remove("not-turn");
      }
    }
  };

  return { winner, resetBoard, updateBoard };
})();

const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;

  return {};
};

const playAgain = () => {
  moveCounter = 0;
  Gameboard.resetBoard();
  finalResultModal.style.display = "none";
};

const player1 = Player("Jayant", "X");
const player2 = Player("Computer", "O");

const gameGrid = document.getElementById("game-grid");

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("game-grid-cell");
  cell.dataset.gridCell = i;
  cell.addEventListener("click", (e) => {
    if (moveCounter < 9) {
      if (moveCounter % 2 === 0) {
        Gameboard.updateBoard(e.target.dataset.gridCell, "X");
      } else {
        Gameboard.updateBoard(e.target.dataset.gridCell, "O");
      }
    }
  });
  gameGrid.appendChild(cell);
}
