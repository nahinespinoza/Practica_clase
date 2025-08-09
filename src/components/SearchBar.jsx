import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative w-full">
      {/* Campo de búsqueda */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)} // Actualiza el estado del término de búsqueda
        placeholder="Busca un producto..."
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
}

export default SearchBar;
