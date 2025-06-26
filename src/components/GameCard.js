'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatPlayCount, formatRating, generateStarRating, getHomepageConfig } from '../utils/gameData';

// Single Game Card Component
const GameCard = ({ 
  game, 
  size = 'medium', 
  showStats = true, 
  showDescription = false,
  className = '' 
}) => {
  const [imageError, setImageError] = useState(false);
  const homepageConfig = getHomepageConfig();

  const handleImageError = () => {
    setImageError(true);
  };

  // 检查游戏标签类型
  const isNewGame = homepageConfig?.newGames?.includes(game.id);
  const isHotGame = homepageConfig?.hotGames?.includes(game.id);

  // Size configurations
  const sizeConfig = {
    small: {
      container: 'rounded-lg shadow-sm hover:shadow-md',
      image: 'h-24',
      title: 'text-sm font-medium',
      description: 'text-xs',
      stats: 'text-xs'
    },
    medium: {
      container: 'rounded-lg shadow-md hover:shadow-lg',
      image: 'h-32',
      title: 'text-base font-semibold',
      description: 'text-sm',
      stats: 'text-sm'
    },
    large: {
      container: 'rounded-lg shadow-lg hover:shadow-xl',
      image: 'h-40',
      title: 'text-lg font-bold',
      description: 'text-base',
      stats: 'text-base'
    }
  };

  const config = sizeConfig[size];
  const starRating = generateStarRating(game.rating);

  return (
    <Link href={`/games/${game.slug}`} className="block">
      <div 
        className={`game-card bg-white ${config.container} transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${className}`}
      >
        {/* Game Image */}
        <div className={`${config.image} overflow-hidden rounded-t-lg bg-gray-200 relative`}>
          {!imageError ? (
            <img
              src={game.screenshot}
              alt={game.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white">
              <div className="text-center">
                <div className="text-2xl mb-1">🎮</div>
                <div className="text-xs font-medium">{game.title}</div>
              </div>
            </div>
          )}
          
          {/* New/Hot Badge - 左上角 */}
          {(isNewGame || isHotGame) && (
            <div className="absolute top-1 left-1">
              {isNewGame && (
                <span className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  NEW
                </span>
              )}
              {isHotGame && !isNewGame && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  HOT
                </span>
              )}
            </div>
          )}
          
          {/* Rating Badge - 右上角 */}
          {showStats && (
            <div className="absolute top-1 right-1 bg-black bg-opacity-70 text-white text-[10px] px-1 py-0.5 rounded-full">
              ⭐ {formatRating(game.rating)}
            </div>
          )}
        </div>

        {/* Game Info */}
        <div className="p-2">
          <div className={`${config.title} text-gray-900 mb-1 line-clamp-2 text-left font-semibold`}>
            {game.title}
          </div>
          
          {showDescription && (
            <p className={`${config.description} text-gray-600 mb-1 line-clamp-2 text-left`}>
              {game.description}
            </p>
          )}

          {/* Game Tags */}
          {game.tags && game.tags.length > 0 && size !== 'small' && (
            <div className="mt-1 flex flex-wrap gap-1">
              {game.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-600 text-xs px-1 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

// Games Grid Component
export const GameGrid = ({ 
  games, 
  title,
  showMore = false,
  onShowMore,
  className = '',
  gridCols = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
}) => {
  if (!games || games.length === 0) {
    return (
      <div className={`games-grid ${className}`}>
        {title && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
        )}
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No games available</h3>
          <p className="text-gray-600">Check back later for new games!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`games-grid ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {showMore && (
            <button
              onClick={onShowMore}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
            >
              View All →
            </button>
          )}
        </div>
      )}
      
      <div className={`grid ${gridCols} gap-4`}>
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            size="medium"
            showStats={true}
            showDescription={false}
          />
        ))}
      </div>
    </div>
  );
};

// Sidebar Game List Component
export const SidebarGameList = ({ 
  games, 
  title = "Related Games",
  className = '' 
}) => {
  if (!games || games.length === 0) {
    return null;
  }

  return (
    <div className={`sidebar-game-list ${className}`}>
      {title && (
        <h3 className="text-base font-semibold text-gray-900 mb-3 text-left">{title}</h3>
      )}
      
      <div className="space-y-2">
        {games.map((game, index) => (
          <SidebarGameItem 
            key={game.id} 
            game={game} 
          />
        ))}
      </div>
    </div>
  );
};

// Sidebar Game Item Component
const SidebarGameItem = ({ game }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

    return (
                      <Link href={`/games/${game.slug}`} className="block">
      <div 
        className="sidebar-game-item flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      >
        {/* Game Image */}
        <div className="flex-shrink-0 w-32 h-18 rounded-md overflow-hidden bg-gray-200">
          {!imageError ? (
            <img
              src={game.screenshot}
              alt={game.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs">
              🎮
            </div>
          )}
        </div>
        
        {/* Game Info */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate text-left">
            {game.title}
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <span>⭐ {formatRating(game.rating)}</span>
            <span>•</span>
            <span>🎮 {formatPlayCount(game.playCount)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard; 