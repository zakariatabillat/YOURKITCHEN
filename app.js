// Éléments du formulaire de recherche
const formRecherche = document.querySelector("#form-recherche");
const champRecherche = document.querySelector("#champ-recherche");

// Bouton "Voir toutes les recettes"
const btnToutes = document.querySelector("#btn-toutes");

// Charge les recettes au démarrage de la page
async function chargerRecettes() {
  const data = await getRecettes();
  afficherRecettes(data.recipes);
}

// Lance une recherche avec le mot tapé par le membre
async function lancerRecherche(event) {
  event.preventDefault();

  const motCle = champRecherche.value.trim();
  const data = await rechercherRecettes(motCle);
  afficherRecettes(data.recipes);
}

// Vide le champ et recharge les 12 recettes
function voirToutes() {
  champRecherche.value = "";
  chargerRecettes();
}

// Écoute l'envoi du formulaire (clic ou touche Entrée)
formRecherche.addEventListener("submit", lancerRecherche);

// Écoute le clic sur "Voir toutes les recettes"
btnToutes.addEventListener("click", voirToutes);

chargerRecettes();