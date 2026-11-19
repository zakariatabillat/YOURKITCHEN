const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000
});

async function getRecettes() {
  const response = await api.get("/recipes", {
    params: { limit: 12 }
  });
  return response.data;
}

async function rechercherRecettes(motCle) {
  const response = await api.get("/recipes/search", {
    params: { q: motCle }
  });
  return response.data;
}