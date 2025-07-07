'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

// 本地存储键名
const FAVORITES_STORAGE_KEY = 'geometry-dash-favorites';

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 从localStorage加载收藏数据
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          if (Array.isArray(parsedFavorites)) {
            setFavorites(parsedFavorites);
          }
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        localStorage.removeItem(FAVORITES_STORAGE_KEY);
      } finally {
        setIsLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  // 保存收藏数据到localStorage
  const saveFavorites = (newFavorites) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // 添加游戏到收藏
  const addToFavorites = (game) => {
    if (!game || !game.id) return false;
    
    const isAlreadyFavorite = favorites.some(fav => fav.id === game.id);
    if (isAlreadyFavorite) return false;

    const favoriteItem = {
      id: game.id,
      slug: game.slug,
      title: game.title,
      thumbnail: game.thumbnail,
      category: game.category,
      rating: game.rating,
      addedAt: new Date().toISOString()
    };

    const newFavorites = [...favorites, favoriteItem];
    saveFavorites(newFavorites);
    return true;
  };

  // 从收藏中移除游戏
  const removeFromFavorites = (gameId) => {
    if (!gameId) return false;

    const newFavorites = favorites.filter(fav => fav.id !== gameId);
    saveFavorites(newFavorites);
    return true;
  };

  // 切换收藏状态
  const toggleFavorite = (game) => {
    if (!game || !game.id) return false;
    
    const isCurrentlyFavorite = isFavorite(game.id);
    
    if (isCurrentlyFavorite) {
      return removeFromFavorites(game.id);
    } else {
      return addToFavorites(game);
    }
  };

  // 检查游戏是否已收藏
  const isFavorite = (gameId) => {
    return favorites.some(fav => fav.id === gameId);
  };

  // 获取收藏数量
  const getFavoritesCount = () => {
    return favorites.length;
  };

  // 清除所有收藏
  const clearAllFavorites = () => {
    saveFavorites([]);
  };

  const value = {
    // 状态
    favorites,
    isLoaded,
    
    // 核心操作方法
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    clearAllFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// 自定义Hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export { FavoritesContext }; 