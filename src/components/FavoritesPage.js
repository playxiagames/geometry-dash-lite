'use client';


import { useFavorites } from '../contexts/FavoritesContext';
import { GameGrid } from './GameCard';

const FavoritesPage = () => {
  const { 
    favorites, 
    isLoaded, 
    getFavoritesCount, 
    clearAllFavorites
  } = useFavorites();

  // 如果还在加载
  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 页面标题和统计 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Favorite Games
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {getFavoritesCount()} games in your collection
          </p>
        </div>
        
        {/* 清空按钮 */}
        {favorites.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all favorites?')) {
                clearAllFavorites();
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* 如果没有收藏的游戏 */}
      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">💔</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No favorite games yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Start exploring and add your favorite games to this collection!
          </p>
          <a
            href="/all-games/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Games
          </a>
        </div>
      ) : (
        /* 收藏游戏网格 */
        <GameGrid games={favorites} showDescription={true} />
      )}
    </div>
  );
};

export default FavoritesPage; 