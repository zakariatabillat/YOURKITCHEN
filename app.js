const formRecherche = document.querySelector("#form-recherche");
const champRecherche = document.querySelector("#champ-recherche");
const btnToutes = document.querySelector("#btn-toutes");
const formAjout = document.querySelector("#form-ajout");

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

// Lit les 4 champs avec les noms de l'API
function lireFormulaire() {
  return {
    name: document.querySelector("#nom").value,
    cuisine: document.querySelector("#cuisine").value,
    difficulty: document.querySelector("#difficulte").value,
    prepTimeMinutes: document.querySelector("#temps").value
  };
}

function envoyerFormulaire(event) {
  event.preventDefault();
  const recette = lireFormulaire();
  const erreurs = validerRecette(recette);
  afficherErreurs(erreurs);
}

formRecherche.addEventListener("submit", lancerRecherche);
btnToutes.addEventListener("click", voirToutes);
formAjout.addEventListener("submit", envoyerFormulaire);

chargerRecettes();