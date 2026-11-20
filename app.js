const formRecherche = document.querySelector("#form-recherche");
const champRecherche = document.querySelector("#champ-recherche");
const btnToutes = document.querySelector("#btn-toutes");
const formAjout = document.querySelector("#form-ajout");
const btnAjouter = document.querySelector("#btn-ajouter");
const grilleRecettes = document.querySelector("#recettes");

async function chargerRecettes() {
  const data = await getRecettes();
  afficherRecettes(data.recipes);
}

async function lancerRecherche(event) {
  event.preventDefault();
  const motCle = champRecherche.value.trim();
  const data = await rechercherRecettes(motCle);
  afficherRecettes(data.recipes);
}

function voirToutes() {
  champRecherche.value = "";
  chargerRecettes();
}

function lireFormulaire() {
  return {
    name: document.querySelector("#nom").value,
    cuisine: document.querySelector("#cuisine").value,
    difficulty: document.querySelector("#difficulte").value,
    prepTimeMinutes: document.querySelector("#temps").value
  };
}

async function envoyerFormulaire(event) {
  event.preventDefault();
  const recette = lireFormulaire();
  const erreurs = validerRecette(recette);
  afficherErreurs(erreurs);

  if (Object.keys(erreurs).length > 0) {
    return;
  }

  const nouvelle = {
    name: recette.name.trim(),
    cuisine: recette.cuisine.trim(),
    difficulty: recette.difficulty,
    prepTimeMinutes: Number(recette.prepTimeMinutes)
  };

  btnAjouter.disabled = true;
  try {
    const data = await ajouterRecette(nouvelle);
    ajouterCarteEnPremier(data);
    formAjout.reset();
    afficherSucces("Recette « " + data.name + " » ajoutée avec succès.");
  } finally {
    btnAjouter.disabled = false;
  }
}

// Un seul écouteur sur la grille pour tous les boutons Supprimer
async function gererClicGrille(event) {
  if (!event.target.classList.contains("btn-supprimer")) {
    return;
  }

  const carte = event.target.closest(".carte");
  const nom = carte.querySelector("h2").textContent;

  const ok = confirm("Supprimer la recette « " + nom + " » ?");
  if (!ok) {
    return;
  }

  const data = await supprimerRecette(carte.dataset.id);
  retirerCarte(carte);
  afficherSucces("Recette « " + data.name + " » supprimée.");
}

formRecherche.addEventListener("submit", lancerRecherche);
btnToutes.addEventListener("click", voirToutes);
formAjout.addEventListener("submit", envoyerFormulaire);
grilleRecettes.addEventListener("click", gererClicGrille);

chargerRecettes();