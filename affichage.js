const zoneRecettes = document.querySelector("#recettes");
const zoneCompteur = document.querySelector("#compteur");
const zoneAucunResultat = document.querySelector("#aucun-resultat");
const zoneSucces = document.querySelector("#message-succes");

const IMAGE_PAR_DEFAUT = "https://dummyjson.com/image/400x300?text=Nouvelle+recette";

function creerCarte(recette) {
  const carte = document.createElement("article");
  carte.className = "carte";
  carte.dataset.id = recette.id;

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

  const btnSupprimer = document.createElement("button");
  btnSupprimer.type = "button";
  btnSupprimer.className = "btn-supprimer";
  btnSupprimer.textContent = "Supprimer";

  carte.appendChild(photo);
  carte.appendChild(nom);
  carte.appendChild(cuisine);
  carte.appendChild(difficulte);
  carte.appendChild(temps);
  carte.appendChild(btnSupprimer);

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

function afficherSucces(texte) {
  zoneSucces.textContent = texte;
  zoneSucces.hidden = false;

  setTimeout(function () {
    zoneSucces.hidden = true;
  }, 3000);
}

// Retire une carte et met à jour le compteur
function retirerCarte(carte) {
  carte.remove();

  const nombre = zoneRecettes.children.length;
  afficherCompteur(nombre);
  afficherMessageVide(nombre);
}

const zoneChargement = document.querySelector("#chargement");

function afficherChargement(visible) {
  zoneChargement.hidden = !visible;
}

const zoneErreur = document.querySelector("#zone-erreur");
const texteErreur = document.querySelector("#texte-erreur");

function afficherErreur(texte) {
  texteErreur.textContent = texte;
  zoneErreur.hidden = false;
}

function cacherErreur() {
  zoneErreur.hidden = true;
}