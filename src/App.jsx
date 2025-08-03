import React, { useState, useEffect } from "react";
import { gatitoRandom, getCatsByBreed, getBreeds } from "./services/catServices";
import SearchBar from "./components/SearchBar";
import FavoriteList from "./components/FavoriteList";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar razas al inicio
  useEffect(() => {
    const axiosBreeds = async () => {
      const data = await getBreeds();
      setBreeds(data);
    };
    axiosBreeds();
  }, []);

  // Cargar gato random al inicio
  useEffect(() => {
    const axiosCat = async () => {
      const gatito = await gatitoRandom();
      setCats([gatito]);
    };
    axiosCat();
  }, []);

  // Buscar gatos por raza seleccionada
  const handleSearch = async () => {
    if (!selectedBreed) return;
    setLoading(true);
    const catsData = await getCatsByBreed(selectedBreed);
    setCats(catsData);
    setLoading(false);
  };

  // Agregar a favoritos
  const handleAddToFavorites = (cat) => {
    if (!favorites.some((fav) => fav.id === cat.id)) {
      setFavorites([...favorites, cat]);
    }
  };

  // Quitar de favoritos
  const handleRemoveFromFavorites = (catId) => {
    setFavorites(favorites.filter((cat) => cat.id !== catId));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🐾 Explorador de Gatos</h1>

      {/* Gato random si no hay búsqueda */}
      {cats.length > 0 && !selectedBreed && (
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Gato aleatorio del día</h2>
          <img
            src={cats[0].url}
            alt="Gato aleatorio"
            className="mx-auto rounded-lg shadow-md max-h-96"
          />
        </div>
      )}

      {/* Mostrar favoritos */}
      <FavoriteList
        favorites={favorites}
        onRemoveFromFavorites={handleRemoveFromFavorites}
      />

      {/* Filtro y búsqueda */}
      <div className="flex gap-3 mb-6 items-center">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          breeds={breeds}
          setSelectedBreed={setSelectedBreed}
        />

        {/* Botón de Buscar al lado de la barra de búsqueda */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          disabled={!selectedBreed || loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* Resultados de búsqueda */}
      {cats.length > 0 && selectedBreed && (
        <div className="grid grid-cols-2 gap-4">
          {cats.map((cat) => (
            <div key={cat.id} className="relative">
              <img
                src={cat.url}
                alt={`Gato de raza ${selectedBreed}`}
                className="rounded-md shadow-md w-full"
              />
              <button
                onClick={() => handleAddToFavorites(cat)}
                className="absolute top-2 right-2 bg-white text-pink-600 px-2 py-1 text-sm rounded shadow hover:bg-pink-100"
              >
                ❤️ Favorito
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje si no hay resultados */}
      {!loading && selectedBreed && cats.length === 0 && (
        <p className="text-center mt-6 text-gray-600">
          No se encontraron gatos para esta raza.
        </p>
      )}
    </div>
  );
}

export default App;