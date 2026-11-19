// Retourne un objet d'erreurs, vide si tout est valide
function validerRecette(recette) {
  const erreurs = {};

  const nom = recette.name.trim();
  if (nom.length < 3 || nom.length > 60) {
    erreurs.nom = "Le nom doit contenir entre 3 et 60 caractères.";
  }

  if (recette.cuisine.trim() === "") {
    erreurs.cuisine = "La cuisine est obligatoire.";
  }

  if (recette.difficulty === "") {
    erreurs.difficulte = "Choisissez une difficulté.";
  }

  const temps = Number(recette.prepTimeMinutes);
  if (!Number.isInteger(temps) || temps < 1 || temps > 300) {
    erreurs.temps = "Le temps doit être un nombre entier entre 1 et 300.";
  }

  return erreurs;
}