const zoneRecettes = document.querySelector("#recettes");
const zoneCompteur = document.querySelector("#compteur");
const zoneAucunResultat = document.querySelector("#aucun-resultat");

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

function afficherCompteur(nombre) {
  if (nombre > 1) {
    zoneCompteur.textContent = nombre + " recettes affichées";
  } else {
    zoneCompteur.textContent = nombre + " recette affichée";
  }
}

function afficherMessageVide(nombre) {
  if (nombre === 0) {
    zoneAucunResultat.hidden = false;
  } else {
    zoneAucunResultat.hidden = true;
  }
}

function afficherRecettes(recettes) {
  zoneRecettes.innerHTML = "";

  recettes.forEach(function (recette) {
    const carte = creerCarte(recette);
    zoneRecettes.appendChild(carte);
  });

  afficherCompteur(recettes.length);
  afficherMessageVide(recettes.length);
}

// Écrit chaque erreur sous son champ, ou vide la zone
function afficherErreurs(erreurs) {
  const champs = ["nom", "cuisine", "difficulte", "temps"];

  champs.forEach(function (champ) {
    const zone = document.querySelector("#erreur-" + champ);
    zone.textContent = erreurs[champ] || "";
  });
}