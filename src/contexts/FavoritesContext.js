import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const getKey = (product) =>
    product?.id != null ? String(product.id) : product?.nome ?? null;

  const addFavorite = (product) => {
    setFavorites((prev) => {
      const key = getKey(product);
      if (!key || prev.find((p) => getKey(p) === key)) return prev;
      return [...prev, product];
    });
  };

  const removeFavorite = (productId) => {
    setFavorites((prev) =>
      prev.filter((p) => String(p.id) !== String(productId))
    );
  };

  const isFavorite = (productId) => {
    if (productId == null) return false;
    return favorites.some((p) => String(p.id) === String(productId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
