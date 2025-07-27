import apiServices from "./apiServices";

export const gatitoRandom = async () => {
 try {
    const response = await apiServices.get ("/images/search");
    return response.data[0];
  } catch (error) {
    console.error("Gatito se escapo de casa 😿", error);
    return null;
  }
 };

export const getBreeds = async () => {
  try {
    const response = await apiServices.get('/breeds');
    return response.data;
  } catch (error) {
    console.error("Error al obtener las razas de gatos:", error);
    return []; // Devuelve un array vacío para no romper la app
  }
};

export const getCatsByBreed = async (breedId) => {
  try {
    const response = await apiServices.get(`/images/search?breed_ids=${breedId}&limit=6`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener gatos de la raza ${breedId}:`, error);
    return [];
  }
};