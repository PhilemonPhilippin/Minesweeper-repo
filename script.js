// Déclarations et mise en place
const BOMB = "B";
CreateLayoutGrid();
const gameContentArray = [...Array(81)];
const bombList = CreateBombList();
AddBombsToLayout(bombList);
// Mon programme commence ici
// Début
// Je check que tout fonctionne bien et met entre parentheses le nombre de bombes voisines
for (let i = 0; i < gameContentArray.length; i++) {
  const square = document.getElementById(`${i}`);
  square.textContent += `(${GetClue(i)})`;
}
// Fin

// Construire une grille visuelle de 81 cases
function CreateLayoutGrid() {
  const gameLayoutGrid = document.getElementById("game-grid");
  // Je crée 81 div avec class="square" et id="i"
  for (let i = 0; i < 81; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("id", `${i}`);
    // J'affiche l'index pour des raisons de développement
    square.textContent = `${i}`;

    gameLayoutGrid.appendChild(square);
  }
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

// Ajout de la lettre B pour chaque bombe dans la grille du jeu (LAYOUT et )
function AddBombsToLayout(bombList) {
  bombList.forEach((bombIndex) => {
    const bomb = document.getElementById(`${bombIndex}`);
    bomb.textContent = BOMB;
    bomb.classList.add("bomb");
    gameContentArray[bombIndex] = BOMB;
  });
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

  return bombCounter.toString();
}

function IsBomb(squareNeighbour) {
  // Si dans mon tableau se trouve une bombe au même index que cette case voisine => return true
  return gameContentArray[squareNeighbour] === BOMB;
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
