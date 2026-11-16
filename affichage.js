
const zoneRecettes = document.querySelector("#recettes");

function creerCarte(recette) {
  const carte = document.createElement("article");
  carte.className = "carte";

  const photo = document.createElement("img");
  photo.src = recette.image;
  photo.alt = "Photo de la recette " + recette.name;

  const nom = document.createElement("h2");
  nom.textContent = recette.name;

  const cuisine = document.createElement("p");
  cuisine.textContent = "Cuisine : " + recette.cuisine;

  const difficulte = document.createElement("p");
  difficulte.textContent = "Difficulté : " + recette.difficulty;

  const temps = document.createElement("p");
  temps.textContent = "Préparation : " + recette.prepTimeMinutes + " min";

  carte.appendChild(photo);
  carte.appendChild(nom);
  carte.appendChild(cuisine);
  carte.appendChild(difficulte);
  carte.appendChild(temps);

  return carte;
}


function afficherRecettes(recettes) {
  zoneRecettes.innerHTML = "";

  recettes.forEach(function (recette) {
    const carte = creerCarte(recette);
    zoneRecettes.appendChild(carte);
  });
}