
async function chargerRecettes() {
  const data = await getRecettes();
  afficherRecettes(data.recipes);
}

chargerRecettes();