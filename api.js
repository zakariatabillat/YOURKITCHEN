const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000
});

// Traduit une erreur Axios en message clair
function messageErreur(error) {
  if (error.response) {
    if (error.response.status === 404) {
      return "Recette introuvable (404).";
    }
    if (error.response.status >= 500) {
      return "Erreur serveur (500). Réessayez plus tard.";
    }
    return "Erreur " + error.response.status + ".";
  }
  if (error.request) {
    return "Serveur injoignable. Vérifiez votre connexion.";
  }
  return "Erreur inattendue.";
}

async function getRecettes() {
  try {
    const response = await api.get("/recipes", { params: { limit: 12 } });
    return response.data;
  } catch (error) {
    throw new Error(messageErreur(error));
  }
}

async function rechercherRecettes(motCle) {
  try {
    const response = await api.get("/recipes/search", { params: { q: motCle } });
    return response.data;
  } catch (error) {
    throw new Error(messageErreur(error));
  }
}

async function ajouterRecette(recette) {
  try {
    const response = await api.post("/recipes/add", recette);
    return response.data;
  } catch (error) {
    throw new Error(messageErreur(error));
  }
}

async function supprimerRecette(id) {
  try {
    const response = await api.delete("/recipes/" + id);
    return response.data;
  } catch (error) {
    throw new Error(messageErreur(error));
  }
}