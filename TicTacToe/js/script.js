const cells = document.querySelectorAll(".cell"); //.cell vindo do index.html div class=cell
const titleHeader = document.querySelector("#titleHeader"); //#title header vindo do index.html div id=titleHeader
const xPlayerDisplay = document.querySelector("#xPlayerDisplay"); //#xPlayerDisplay vindo do index.html  <div class="player player-active" id="xPlayerDisplay">X</div>
//Basicamente, se for class, coloca ".", se for id, coloca "#", assim como no css
const oPlayerDisplay = document.querySelector("#oPlayerDisplay");
const restartButton = document.querySelector("#restartButton");

let player = "X";
let isPauseGame = false;
let isGameStart = false;

const inputCells = ["", "", "", "", "", "", "", "", ""];
const arrayWinCond = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => tapCell(cell, index));
});

function tapCell(cell, index) {
  if (cell.textContent == "" && !isPauseGame) {
    isGameStart = true;
    updateCell(cell, index);

    if (!checkWinner()) {
      changePlayer();
      randomPick();
    }
  }
}

function updateCell(cell, index) {
  cell.textContent = player;
  inputCells[index] = player;
  cell.style.color = player == "X" ? "#4682b4" : "#f08080";
}

function changePlayer() {
  player = player == "X" ? "O" : "X";
}

function randomPick() {
  isPauseGame = true;

  setTimeout(() => {
    let randomIndex;
    do {
      // Pick a random index
      randomIndex = Math.floor(Math.random() * inputCells.length);
    } while (
      // Ensure the chosen cell is empty
      inputCells[randomIndex] != ""
    );

    // Update the cell with Computer move
    updateCell(cells[randomIndex], randomIndex, player);
    // Check if Computer not won
    if (!checkWinner()) {
      changePlayer();
      // Swith back to Human player
      isPauseGame = false;
      return;
    }
    player = player == "X" ? "O" : "X";
  }, 1000); // Delay Computer move by 1 second
}

function choosePlayer(selectedPlayer) {
  if (!isGameStart) {
    player = selectedPlayer;
    if (player == "X") {
      xPlayerDisplay.classList.add("player-active");
      oPlayerDisplay.classList.remove("player-active");
    } else {
      xPlayerDisplay.classList.remove("player-active");
      oPlayerDisplay.classList.add("player-active");
    }
  }
}

function checkWinner() {
  for (const [a, b, c] of arrayWinCond) {
    if (
      inputCells[a] == player &&
      inputCells[b] == player &&
      inputCells[c] == player
    ) {
      declareWinner([a, b, c]);
      return true;
    }
  }
  if (inputCells.every((cell) => cell != "")) {
    declareDraw();
    return true;
  }
}

function declareDraw() {
  titleHeader.textContet = "It's a Draw";
  isPauseGame = true;
  restartButton.style.visibility = "visible";
}

function declareWinner(winningIndices) {
  titleHeader.textContent = `${player} win`;
  isPauseGame = true;

  winningIndices.forEach(
    (index) => (cells[index].style.background = "#3a416c")
  );

  restartButton.style.visibility = "visible";
}

restartButton.addEventListener("click", () => {
  restartButton.style.visibility = "hidden";
  inputCells.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.background = "";
  });
  isPauseGame = false;
  isGameStart = false;
  titleHeader.textContent = "Choose X or O";
});
