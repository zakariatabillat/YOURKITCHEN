const zoneRecettes = document.querySelector("#recettes");
const zoneCompteur = document.querySelector("#compteur");
const zoneAucunResultat = document.querySelector("#aucun-resultat");

const IMAGE_PAR_DEFAUT = "https://dummyjson.com/image/400x300?text=Nouvelle+recette";

function creerCarte(recette) {
  const carte = document.createElement("article");
  carte.className = "carte";

  const photo = document.createElement("img");
  photo.src = recette.image || IMAGE_PAR_DEFAUT;
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

// Place la nouvelle carte en tête de la grille
function ajouterCarteEnPremier(recette) {
  const carte = creerCarte(recette);
  zoneRecettes.prepend(carte);

  const nombre = zoneRecettes.children.length;
  afficherCompteur(nombre);
  afficherMessageVide(nombre);
}

function afficherErreurs(erreurs) {
  const champs = ["nom", "cuisine", "difficulte", "temps"];

  champs.forEach(function (champ) {
    const zone = document.querySelector("#erreur-" + champ);
    zone.textContent = erreurs[champ] || "";
  });
}
const zoneSucces = document.querySelector("#message-succes");

// Affiche un message vert pendant 3 secondes
function afficherSucces(texte) {
  zoneSucces.textContent = texte;
  zoneSucces.hidden = false;

  setTimeout(function () {
    zoneSucces.hidden = true;
  }, 3000);
}