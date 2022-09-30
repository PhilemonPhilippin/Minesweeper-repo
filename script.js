// Déclarations et mise en place
const BOMB = "B";
let gameContentArray = [];
let bombList = [];

// Mon programme commence ici
// Début
StartGame();
// Fin

// Ajoute un EventListener à chaque case
function AddEventListeners() {
  for (let i = 0; i < 81; i++) {
    const square = document.getElementById(i);
    square.addEventListener(
      "click",
      () => {
        HandleSquareClick(i);
      },
      false
    );
  }
}

// Affiche le nombre de bombes voisines de la case cliquée
function AddClueToText(squareIndex) {
  const square = document.getElementById(squareIndex);
  square.textContent = GetClue(squareIndex);
  square.classList.add("clue");
}

// Affiche une explosion si on clique sur une bombe et return true
function IfBombAddExplosion(squareIndex) {
  let isBomb = false;
  if (bombList.includes(squareIndex)) {
    const square = document.getElementById(squareIndex);
    square.textContent = "💣";
    square.classList.add("bomb");
    isBomb = true;
  }
  return isBomb;
}

// Un EventHandler qui traite le clic d'une cause
function HandleSquareClick(squareIndex) {
  if (IfBombAddExplosion(squareIndex)) {
    let userAnswer = prompt("You exploded. Try again? 'y' for yes");
    if (userAnswer === "y") {
      ResetGame();
    } else {
      console.log("You lost");
    }
  } else {
    AddClueToText(squareIndex);
    RevealNeighbourSquares(squareIndex);
    if (IsGameWon()) {
      let userAnswer = prompt("You WON. Try again? 'y' for yes");
      if (userAnswer === "y") {
        ResetGame();
      } else {
        console.log("You WON");
      }
    }
  }
}

// Révéler tous les zéros voisins
function RevealNeighbourSquares(squareIndex) {
  if (IsClueZero(squareIndex) === true) {
    const neighbours = GetNeighbours(squareIndex);
    let zerosFoundList = [];
    // Pour chaque voisin du zéro trouvé je regarde si c'est un zéro sans être une bombe
    // Si c'est le cas je l'ajoute à ma liste de zéros trouvés
    neighbours.forEach((neighbour) => {
      if (IsClueZero(neighbour) && IsBomb(neighbour) === false) {
        AddClueToText(neighbour);
        zerosFoundList.push(neighbour);
      }
    });
    // Tant que ma liste de zéros trouvés n'est pas vide, je cherche les voisins de chaque membre de cette liste
    while (zerosFoundList.length > 0) {
      zerosFoundList = RevealAgain(zerosFoundList);
    }
  }
}

// Seconde méthode (pour éviter la récursivité)
function RevealAgain(zerosFoundList) {
  const secondZerosFoundList = [];
  // Pour chaque zéro trouvé dans ma liste je trouve ses voisins
  zerosFoundList.forEach((zero) => {
    let neighbours = GetNeighbours(zero);
    // Je retire de ma liste les voisins qui sont déjà révélés
    neighbours = neighbours.filter(
      (neighbour) =>
        document.getElementById(neighbour).classList.contains("clue") === false
    );

    // Pour chaque voisin de ma liste je l'ajoute à ma nouvelle liste si c'est un zéro sans être une bombe
    neighbours.forEach((neighbour) => {
      if (IsClueZero(neighbour) && IsBomb(neighbour) === false) {
        AddClueToText(neighbour);
        secondZerosFoundList.push(neighbour);
      }
    });
  });
  // Je retire les doublons
  const zerosWithNoDuplicate = [...new Set(secondZerosFoundList)];
  return zerosWithNoDuplicate;
}

// Pour une case donnée, compter combien de cases voisines incluent une Bombe
function GetClue(squareIndex) {
  let bombCounter = 0;
  let neighbours = GetNeighbours(squareIndex);

  neighbours.forEach((neighbour) => {
    if (IsBomb(neighbour)) {
      bombCounter++;
    }
  });

  return bombCounter;
}

// Si la case ne touche aucune bombe
function IsClueZero(squareIndex) {
  return GetClue(squareIndex) === 0;
}

// Si le case inclue une bombe
function IsBomb(squareIndex) {
  return gameContentArray[squareIndex] === BOMB;
}

function IsGameWon() {
  let isGameWon = true;
  for (let i = 0; i < 81; i++) {
    const square = document.getElementById(i);
    const isSquareRevelead = square.classList.contains("clue");
    if (IsBomb(i) === false && isSquareRevelead === false) {
      isGameWon = false;
    }
  }
  return isGameWon;
}

function StartGame() {
  CreateLayoutGrid();
  gameContentArray = [...Array(81)];
  bombList = CreateBombList();
  AddBombsToContentArray(bombList);
  AddEventListeners();
}

function ResetGame() {
  DeleteLayoutGrid();
  StartGame();
}

// Construire une grille visuelle de 81 cases
function CreateLayoutGrid() {
  const game = document.getElementById("game");
  const gameLayoutGrid = document.createElement("div");
  gameLayoutGrid.setAttribute("id", "game-layout-grid");
  game.appendChild(gameLayoutGrid);
  // Je crée 81 div avec class="square" et id="i"
  for (let i = 0; i < 81; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("id", i);
    gameLayoutGrid.appendChild(square);
  }
}

function DeleteLayoutGrid() {
  const gameLayoutGrid = document.getElementById("game-layout-grid");
  gameLayoutGrid.remove();
}

// Construire une liste de 10 bombes avec l'indexe correspondant à chaque bombe
function CreateBombList() {
  const bombList = [];
  let counter = 0;
  while (counter < 10) {
    const random = Math.trunc(Math.random() * 81);
    if (bombList.includes(random) == false) {
      bombList.push(random);
      counter++;
    }
  }
  return bombList;
}

// Ajout de chaque bombe dans l'array du jeu
function AddBombsToContentArray() {
  bombList.forEach((bombIndex) => {
    gameContentArray[bombIndex] = BOMB;
  });
}

// Fonction qui permet d'obtenir toutes les cases voisines d'une case donnée

// Quelles cases sont adjacentes à une case donnée ?
// Ligne précédente : case - 10, case - 9, case - 8
// Ligne-même : case - 1, case + 1
// Ligne suivante : case + 8, case + 9, case + 10

function GetNeighbours(squareIndex) {
  let neighbours = [];

  if (
    IsFirstRow(squareIndex) == false &&
    IsFirstColumn(squareIndex) == false &&
    IsLastColumn(squareIndex) == false &&
    IsLastRow(squareIndex) == false
  ) {
    neighbours = [
      squareIndex - 1,
      squareIndex + 1,
      squareIndex - 10,
      squareIndex - 9,
      squareIndex - 8,
      squareIndex + 8,
      squareIndex + 9,
      squareIndex + 10,
    ];
  } else if (
    IsFirstRow(squareIndex) == true &&
    IsFirstColumn(squareIndex) == false &&
    IsLastColumn(squareIndex) == false &&
    IsLastRow(squareIndex) == false
  ) {
    neighbours = [
      squareIndex - 1,
      squareIndex + 1,
      squareIndex + 8,
      squareIndex + 9,
      squareIndex + 10,
    ];
  } else if (
    IsFirstRow(squareIndex) == false &&
    IsFirstColumn(squareIndex) == true &&
    IsLastColumn(squareIndex) == false &&
    IsLastRow(squareIndex) == false
  ) {
    neighbours = [
      squareIndex + 1,
      squareIndex - 9,
      squareIndex - 8,
      squareIndex + 9,
      squareIndex + 10,
    ];
  } else if (
    IsFirstRow(squareIndex) == false &&
    IsFirstColumn(squareIndex) == false &&
    IsLastColumn(squareIndex) == true &&
    IsLastRow(squareIndex) == false
  ) {
    neighbours = [
      squareIndex - 1,
      squareIndex - 10,
      squareIndex - 9,
      squareIndex + 8,
      squareIndex + 9,
    ];
  } else if (
    IsFirstRow(squareIndex) == false &&
    IsFirstColumn(squareIndex) == false &&
    IsLastColumn(squareIndex) == false &&
    IsLastRow(squareIndex) == true
  ) {
    neighbours = [
      squareIndex - 1,
      squareIndex + 1,
      squareIndex - 10,
      squareIndex - 9,
      squareIndex - 8,
    ];
  } else if (squareIndex === 0) {
    neighbours = [squareIndex + 1, squareIndex + 9, squareIndex + 10];
  } else if (squareIndex === 8) {
    neighbours = [squareIndex - 1, squareIndex + 8, squareIndex + 9];
  } else if (squareIndex === 72) {
    neighbours = [squareIndex + 1, squareIndex - 9, squareIndex - 8];
  } else if (squareIndex === 80) {
    neighbours = [squareIndex - 1, squareIndex - 10, squareIndex - 9];
  }
  return neighbours;
}

// Quatre fonctions pour tester si une case est dans les limites de la grille du jeu
function IsFirstRow(squareIndex) {
  return squareIndex <= 8;
}

function IsFirstColumn(squareIndex) {
  return squareIndex % 9 === 0;
}

function IsLastRow(squareIndex) {
  return squareIndex >= 72;
}

function IsLastColumn(squareIndex) {
  // return squareIndex === 8 || squareIndex === 17 || squareIndex === 26 || squareIndex === 35 || squareIndex === 44 ||
  let isLastColumn = false;
  // Si la case est égale à 8 ou égale à { 8 * i + (i-1) } alors elle est dans la dernière colonne
  if (squareIndex == 8) {
    isLastColumn = true;
  }
  for (let i = 2; i <= 9; i++) {
    if (squareIndex === 8 * i + (i - 1)) {
      isLastColumn = true;
    }
  }
  return isLastColumn;
}
