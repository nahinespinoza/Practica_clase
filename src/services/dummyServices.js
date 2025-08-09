export const getAllProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products; // Retorna la lista de productos
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return []; // Devuelve un array vacío en caso de error
  }
};