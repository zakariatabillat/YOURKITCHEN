const formRecherche = document.querySelector("#form-recherche");
const champRecherche = document.querySelector("#champ-recherche");
const btnToutes = document.querySelector("#btn-toutes");
const formAjout = document.querySelector("#form-ajout");
const btnAjouter = document.querySelector("#btn-ajouter");
const grilleRecettes = document.querySelector("#recettes");
const btnReessayer = document.querySelector("#btn-reessayer");

let derniereAction = null;

// Lance une requête : loader, erreur, et mémoire pour Réessayer
async function executer(action) {
  derniereAction = action;
  cacherErreur();
  afficherChargement(true);
  try {
    await action();
  } catch (error) {
    afficherErreur(error.message);
  } finally {
    afficherChargement(false);
  }
}

function chargerRecettes() {
  return executer(async function () {
    const data = await getRecettes();
    afficherRecettes(data.recipes);
  });
}

function lancerRecherche(event) {
  event.preventDefault();
  const motCle = champRecherche.value.trim();

  executer(async function () {
    const data = await rechercherRecettes(motCle);
    afficherRecettes(data.recipes);
  });
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
  await executer(async function () {
    const data = await ajouterRecette(nouvelle);
    ajouterCarteEnPremier(data);
    formAjout.reset();
    afficherSucces("Recette « " + data.name + " » ajoutée avec succès.");
  });
  btnAjouter.disabled = false;
}

function gererClicGrille(event) {
  if (!event.target.classList.contains("btn-supprimer")) {
    return;
  }

  const carte = event.target.closest(".carte");
  const nom = carte.querySelector("h2").textContent;

  const ok = confirm("Supprimer la recette « " + nom + " » ?");
  if (!ok) {
    return;
  }

  const id = carte.dataset.id;
  executer(async function () {
    const data = await supprimerRecette(id);
    retirerCarte(carte);
    afficherSucces("Recette « " + data.name + " » supprimée.");
  });
}

function reessayer() {
  if (derniereAction) {
    executer(derniereAction);
  }
}

formRecherche.addEventListener("submit", lancerRecherche);
btnToutes.addEventListener("click", voirToutes);
formAjout.addEventListener("submit", envoyerFormulaire);
grilleRecettes.addEventListener("click", gererClicGrille);
btnReessayer.addEventListener("click", reessayer);

chargerRecettes();