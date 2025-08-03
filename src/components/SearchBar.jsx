import React from "react";

function SearchBar({ searchTerm, onSearchChange, breeds, setSelectedBreed }) {
  return (
    <div className="flex gap-3 mb-6 items-start">
      <div className="relative w-full">
        {/* Campo de búsqueda */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)} // Actualiza el estado del término de búsqueda
          placeholder="Escribe una raza..."
          className="w-full p-2 border rounded-md"
        />

        {/* Mostrar las razas filtradas */}
        {searchTerm && (
          <ul className="absolute z-10 bg-white border w-full mt-1 rounded-md max-h-40 overflow-y-auto shadow-lg">
            {breeds
              .filter((breed) =>
                breed.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, 10) // Mostrar solo las primeras 10 razas
              .map((breed) => (
                <li
                  key={breed.id}
                  onClick={() => {
                    setSelectedBreed(breed.id); // Selecciona la raza
                    onSearchChange(breed.name); // Actualiza el término de búsqueda
                  }}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {breed.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;