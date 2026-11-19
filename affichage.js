// Zone de la page où les cartes s'affichent
const zoneRecettes = document.querySelector("#recettes");

// Zone de la page où le nombre de recettes s'affiche
const zoneCompteur = document.querySelector("#compteur");

// Zone du message "Aucune recette trouvée"
const zoneAucunResultat = document.querySelector("#aucun-resultat");

// Construit une carte pour une recette
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

// Affiche le nombre de recettes
function afficherCompteur(nombre) {
  if (nombre > 1) {
    zoneCompteur.textContent = nombre + " recettes affichées";
  } else {
    zoneCompteur.textContent = nombre + " recette affichée";
  }
}

// Montre ou cache le message "Aucune recette trouvée"
function afficherMessageVide(nombre) {
  if (nombre === 0) {
    zoneAucunResultat.hidden = false;
  } else {
    zoneAucunResultat.hidden = true;
  }
}

// Affiche une liste de recettes dans la page
function afficherRecettes(recettes) {
  zoneRecettes.innerHTML = "";

  recettes.forEach(function (recette) {
    const carte = creerCarte(recette);
    zoneRecettes.appendChild(carte);
  });

  afficherCompteur(recettes.length);
  afficherMessageVide(recettes.length);
}