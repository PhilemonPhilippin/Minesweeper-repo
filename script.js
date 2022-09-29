// Déclarer mes pions
const BOMB = "B";

// Construire une grille visuelle de 81 cases
const gameLayoutGrid = document.getElementById("game-grid");
for (let i = 0; i < 81; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  // Je donne un index comme id à chaque square
  square.setAttribute("id", `${i}`);
  // J'affiche l'index pour des raisons de développement
  square.textContent = `${i}`;
  gameLayoutGrid.appendChild(square);
}

// Créer un tableau JavaScript de 81 cases
const gameContentArray = [...Array(81)];

// Créer un tableau de 10 indexes de bombes
const bombIndexes = [];
let counter = 0;
while (counter < 10) {
  const random = Math.trunc(Math.random() * 81);
  if (bombIndexes.includes(random) == false) {
    bombIndexes.push(random);
    counter++;
  }
}

// Ajout de la lettre B pour chaque bombe dans la grille du jeu
bombIndexes.forEach((bombIndex) => {
  const bomb = document.getElementById(`${bombIndex}`);
  bomb.textContent = BOMB;
  bomb.classList.add("bomb");
});

// Ajout du chiffre(string) 1 pour chaque case à côté d'une bombe
// TODO : Faire une méthode pour compter le nombre de bombes adjacentes à une case donnée

// Quelles cases sont adjacentes à une case donnée ?
// Ligne précédente : case - 10, case - 9, case - 8
// Ligne-même : case - 1, case + 1
// Ligne suivante : case + 8, case + 9, case + 10

// Pour chacune de ces cases, regarder si textContent === "B"
// Pour chaque case où c'est vrai, ajouter un au bombCounter
// Afficher bombCounter en textContent de la dite case

function GetClue(squareIndex) {
  let bombCounter = 0;
  if (isNextToBomb(squareIndex - 1)) {
  }
}

function IsNextToBomb(squareNeighbour) {
  const neighbour = document.getElementById(`${squareNeighbour}`);
  return neighbour.textContent === BOMB;
}

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

// Ajout du chiffre(string) 2 pour chaque case à côté de deux bombes

// etc. jusqu a 8 bombes

// Fonction qui permet d'obtenir toutes les cases voisines d'une case donnée
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

console.log(GetNeighbours(72));
