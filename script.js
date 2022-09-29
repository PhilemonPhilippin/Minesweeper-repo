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

bombIndexes.forEach((bombIndex) => {
  const bomb = document.getElementById(`${bombIndex}`);
  bomb.textContent = "B";
  bomb.classList.add("bomb");
});
