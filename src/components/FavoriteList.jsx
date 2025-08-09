import React from "react";

function FavoriteList({ favorites, onRemoveFromFavorites }) {
  // Si no hay productos favoritos, mostrar mensaje
  if (favorites.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">🛍️ Productos Favoritos</h2>
        <p className="text-gray-500">No tienes productos favoritos aún.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">🛍️ Productos Favoritos</h2>
      <div className="grid grid-cols-2 gap-4">
        {favorites.map((product) => (
          <div key={product.id} className="relative">
            <img
              src={product.thumbnail}  // Usamos 'thumbnail' en lugar de 'image'
              alt={product.title}       // Cambié 'name' por 'title'
              className="rounded-md shadow-md w-full"
            />
            <div className="p-2">
              <h2 className="font-semibold">{product.title}</h2> {/* Cambié 'name' por 'title' */}
              <button
                onClick={() => onRemoveFromFavorites(product.id)}
                className="absolute top-2 right-2 bg-white text-red-600 px-2 py-1 text-sm rounded shadow hover:bg-red-100"
              >
                ❌ Quitar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteList;
