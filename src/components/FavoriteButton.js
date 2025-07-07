'use client';

import { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoriteButton = ({ 
  game, 
  showText = true, 
  className = '' 
}) => {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoaded || !game) return;

    setIsAnimating(true);
    toggleFavorite(game);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  if (!isLoaded) {
    return (
      <div className={`animate-pulse bg-gray-200 dark:bg-slate-700 rounded px-3 py-2 ${className}`} />
    );
  }

  const isCurrentlyFavorite = isFavorite(game?.id);

  // 简化的样式配置
  const baseClasses = `
    inline-flex items-center justify-center transition-all duration-200
    bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600
    text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700
    focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-95
    ${isAnimating ? 'animate-bounce' : ''}
    ${className}
  `;

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${showText ? 'px-3 py-2 rounded-lg text-sm' : 'p-2 rounded-md'}`}
      aria-label={isCurrentlyFavorite ? `Remove ${game?.title} from favorites` : `Add ${game?.title} to favorites`}
      title={isCurrentlyFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {/* Heart Icon */}
      <svg 
        className={`${showText ? 'w-4 h-4' : 'w-5 h-5'} transition-all duration-200 ${
          isCurrentlyFavorite 
            ? 'text-red-500 fill-current' 
            : 'text-gray-400 dark:text-gray-500'
        }`}
        fill={isCurrentlyFavorite ? 'currentColor' : 'none'}
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>

      {/* Text */}
      {showText && (
        <span className="ml-1.5 font-medium">
          {isCurrentlyFavorite ? 'Favorited' : 'Favorite'}
        </span>
      )}
    </button>
  );
};

// 简化的图标版本
export const FavoriteIcon = ({ game, className = '' }) => {
  return (
    <FavoriteButton 
      game={game} 
      showText={false} 
      className={className} 
    />
  );
};

// 带数量的收藏按钮组件
export const FavoriteButtonWithCount = ({ count = 0, className = '' }) => {
  return (
    <div className={`inline-flex items-center space-x-1 ${className}`}>
      <span className="text-gray-600 dark:text-gray-400">❤️</span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {count}
      </span>
    </div>
  );
};

export default FavoriteButton; 