'use client';

import Layout from '../components/Layout';
import GamePlayer from '../components/GamePlayer';
import { GameGrid, SidebarGameList } from '../components/GameCard';
import { GameDescription } from '../components/Layout';
import { 
  getGameById, 
  getHomepageConfig,
  getRandomGames,
  getPopularGames 
} from '../utils/gameData';

export default function HomePage() {
  const homepageConfig = getHomepageConfig();
  const mainGame = getGameById(homepageConfig.mainGame);
  const relatedGames = getRandomGames(8, mainGame.id);
  const moreGames = getPopularGames().slice(0, 12);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Game Player */}
          <div className="lg:col-span-3">
            <GamePlayer game={mainGame} />
          </div>

          {/* Sidebar - Related Games */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🎮 Popular Games</h2>
              <SidebarGameList games={relatedGames} />
            </div>
          </div>
        </div>

        {/* Game Description */}
        <div className="mt-8">
          <GameDescription game={mainGame} />
        </div>

        {/* More Games Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🕹️ More Games to Play</h2>
          </div>
          <GameGrid games={moreGames} />
        </div>

      </div>
    </Layout>
  );
} 