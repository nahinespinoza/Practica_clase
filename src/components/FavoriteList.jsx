import React from "react";

function FavoriteList({ favorites, onRemoveFromFavorites }) {
  // Si no hay gatos favoritos, mostrar mensaje
  if (favorites.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">🐱 Gatos favoritos</h2>
        <p className="text-gray-500">No tienes gatos favoritos aún.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">🐱 Gatos favoritos</h2>
      <div className="grid grid-cols-2 gap-4">
        {favorites.map((cat) => (
          <div key={cat.id} className="relative">
            <img
              src={cat.url}
              alt="Gato favorito"
              className="rounded-md shadow-md w-full"
            />
            <button
              onClick={() => onRemoveFromFavorites(cat.id)}
              className="absolute top-2 right-2 bg-white text-red-600 px-2 py-1 text-sm rounded shadow hover:bg-red-100"
            >
              ❌ Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteList;