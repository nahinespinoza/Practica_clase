import React, { useState, useEffect } from "react";
import { getAllProducts } from "./services/dummyServices"; // Importar servicio
import SearchBar from "./components/SearchBar";
import FavoriteList from "./components/FavoriteList";

function App() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); // Para manejar los productos filtrados en la búsqueda
  const [showDropdown, setShowDropdown] = useState(false); // Controlar si mostrar el dropdown

  // Cargar productos al inicio
  useEffect(() => {
    const loadProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  // Filtrar productos según búsqueda
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = products.filter((product) =>
        product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  // Agregar a favoritos
  const handleAddToFavorites = (product) => {
    if (!favorites.some((fav) => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  // Quitar de favoritos
  const handleRemoveFromFavorites = (productId) => {
    setFavorites(favorites.filter((product) => product.id !== productId));
  };

  // Manejar click en un producto del dropdown
  const handleProductClick = (product) => {
    setSearchTerm(product.title); // Actualizamos el término de búsqueda
    setShowDropdown(false); // Cerramos el dropdown inmediatamente
  };

  // Manejar cambio en la barra de búsqueda
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    // Mostrar dropdown solo cuando se está escribiendo
    setShowDropdown(value.trim().length > 0);
    // Si el valor está vacío, limpiar los productos filtrados
    if (!value.trim()) {
      setFilteredProducts([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Tienda DummyJSON</h1>

      {/* Barra de búsqueda */}
      <div className="relative w-full">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {/* Mostrar dropdown con los productos filtrados */}
        {showDropdown && filteredProducts.length > 0 && (
          <div className="absolute w-full max-w-md bg-white border mt-2 rounded-md shadow-lg z-10">
            <ul>
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  {product.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mostrar favoritos */}
      <FavoriteList
        favorites={favorites}
        onRemoveFromFavorites={handleRemoveFromFavorites}
      />

      {/* Mostrar los productos filtrados */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">🛍️ Productos encontrados</h2>
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="relative">
                <img
                  src={product.thumbnail} // Usamos 'thumbnail' en lugar de 'image'
                  alt={product.title} // Cambié 'name' por 'title'
                  className="rounded-md shadow-md w-full"
                />
                <div className="p-2">
                  <h2 className="font-semibold">{product.title}</h2>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="font-bold mt-2">${product.price}</p>
                  <button
                    onClick={() => handleAddToFavorites(product)}
                    className="absolute top-2 right-2 bg-white text-pink-600 px-2 py-1 text-sm rounded shadow hover:bg-pink-100"
                  >
                    ❤️ Favorito
                  </button>
                </div>
              </div>
            ))
          ) : searchTerm ? (
            <p className="text-center text-gray-600">No se encontraron productos.</p>
          ) : (
            <p className="text-center text-gray-600">Escribe algo para buscar productos.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;