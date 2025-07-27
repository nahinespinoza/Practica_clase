import {useState, useEffect} from "react";

import { gatitoRandom, getCatsByBreed, getBreeds } from "./services/catServices";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🐾 Explorador de Gatos</h1>

      {/* Gato random */}
      {cats && (
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Gato aleatorio del día</h2>
          <img
            src={cats.url}
            alt="Gato aleatorio"
            className="mx-auto rounded-lg shadow-md max-h-96"
          />
        </div>
      )}

      {/* Selector de raza */}
      <div className="flex gap-3 mb-6">
        <select
          className="flex-grow p-2 border rounded-md"
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
        >
          <option value="">-- Selecciona una raza --</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
        
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 transition"
          disabled={!selectedBreed || loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* Resultados */}
      {cats.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Gatos de la raza seleccionada</h3>
          <div className="grid grid-cols-2 gap-4">
            {cats.map((cat) => (
              <img
                key={cat.id}
                src={cat.url}
                alt={`Gato de raza ${selectedBreed}`}
                className="rounded-md shadow-md"
              />
            ))}
          </div>
        </>
      )}

      {/* Mensaje si no hay resultados */}
      {!loading && selectedBreed && cats.length === 0 && (
        <p className="text-center mt-6 text-gray-600">No se encontraron gatos para esta raza.</p>
      )}
    </div>
  );
}

export default App;