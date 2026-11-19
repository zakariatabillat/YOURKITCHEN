
// we created a variable to store the axios api in(url)
const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000
});


// async says: this function contains a wait, and gives its result later
// gotta see async and sync again;
async function getRecettes() {
  const response = await api.get("/recipes", {
    params: { limit: 12 }
  });
  return response.data;
}

// If the server does not answer within 5 seconds, 
// Axios rejects the request, the error comes out at the await line, 
// and my catch block shows the message Serveur injoignable.”

async function rechercherRecettes(motCle) {
  const response = await api.get("/recipes/search", {
    params: { q: motCle }
  });
  return response.data;
}