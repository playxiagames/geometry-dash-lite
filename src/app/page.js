'use client';

import Layout from '../components/Layout';
import GamePlayer from '../components/GamePlayer';
import { GameGrid, SidebarGameList } from '../components/GameCard';
import { GameDescription } from '../components/Layout';
import { 
  getGameById, 
  getHomepageConfig,
  getRelatedGames,
  getFeaturedGames,
  getRandomGames,
  getPopularGames, 
  getAllGames
} from '../utils/gameData';

// 主页的 metadata 在 layout.js 中处理，因为这是客户端组件

export default function HomePage() {
  const homepageConfig = getHomepageConfig();
  const mainGame = getGameById(homepageConfig?.mainGame);
  
  // 错误处理
  if (!mainGame) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎮 Geometry Dash Lite Online
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Play Geometry Dash Lite online for free! Jump and fly your way through danger in this rhythm-based action platformer.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">Loading game data...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const relatedGames = getRelatedGames(mainGame.id);
  const featureGames = getFeaturedGames();
  const popularGames = getPopularGames();
  const allGames = getAllGames();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* Main Game Player */}
          <div className="lg:col-span-3">
            <GamePlayer game={mainGame} />
          </div>

          {/* Sidebar - Related Games */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <SidebarGameList games={relatedGames} title="Related Games" />
            </div>
          </div>
        </div>

        {/* Featured Games Grid */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-left">🎯 Featured Games</h2>
          <GameGrid games={featureGames} />
        </div>

        {/* Popular Games Grid */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-left">🎯 Popular Games</h2>
          <GameGrid games={popularGames} />
        </div>

        {/* More Games Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 text-left">🕹️ Explore More Free Online Games</h2>
          </div>
          <GameGrid games={allGames} />
        </div>

        {/* SEO Content Section - 主要H1标签 */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-left">
            Play Geometry Dash Lite Online - Free Browser Game
          </h1>
          
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to the ultimate <strong>Geometry Dash Lite</strong> online experience! Our platform offers you the chance to play 
              <strong> Geometry Dash Lite</strong> directly in your web browser without any downloads or installations required. 
              This exciting rhythm-based platformer has captivated millions of players worldwide, and now you can enjoy 
              <strong> Geometry Dash Lite</strong> anytime, anywhere, completely free.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">
              What Makes Geometry Dash Lite Special?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Geometry Dash Lite</strong> is more than just a simple jumping game – it's a mesmerizing fusion of precise 
              platforming action and pulse-pounding electronic music. In <strong>Geometry Dash Lite</strong>, you control a geometric 
              character that must navigate through increasingly challenging obstacle courses. The game's unique appeal lies in how 
              the gameplay synchronizes perfectly with the background music, creating an immersive experience that makes 
              <strong> Geometry Dash Lite</strong> stand out from other online games.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">
              How to Play Geometry Dash Lite Online
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Playing <strong>Geometry Dash Lite</strong> on our platform is incredibly simple. Just click the play button above 
              and start your adventure immediately. The controls in <strong>Geometry Dash Lite</strong> are straightforward – 
              tap or click to make your character jump over obstacles and avoid deadly spikes. Timing is everything in 
              <strong> Geometry Dash Lite</strong>, as you'll need to sync your movements with the rhythm of the music to succeed.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">
              Features of Our Geometry Dash Lite Online Version
            </h2>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Instant Play:</strong> No downloads needed to enjoy Geometry Dash Lite</li>
                <li><strong>Cross-Platform:</strong> Play Geometry Dash Lite on desktop, tablet, or mobile</li>
                <li><strong>Free Forever:</strong> Enjoy Geometry Dash Lite without any costs or subscriptions</li>
                <li><strong>Safe & Secure:</strong> Our Geometry Dash Lite version is completely safe to play</li>
                <li><strong>Regular Updates:</strong> We keep our Geometry Dash Lite game current and bug-free</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">
              Tips for Mastering Geometry Dash Lite
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Success in <strong>Geometry Dash Lite</strong> requires practice and patience. Start with the easier levels to get 
              familiar with the controls and rhythm patterns. As you progress in <strong>Geometry Dash Lite</strong>, you'll encounter 
              more complex obstacles and faster-paced sections. Remember, each attempt in <strong>Geometry Dash Lite</strong> is 
              a learning opportunity – analyze where you failed and adjust your timing accordingly.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">
              Why Choose Our Geometry Dash Lite Platform?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website provides the most reliable and enjoyable way to play <strong>Geometry Dash Lite</strong> online. 
              We've optimized <strong>Geometry Dash Lite</strong> for smooth performance across all devices and browsers. 
              Whether you're a newcomer discovering <strong>Geometry Dash Lite</strong> for the first time or a veteran player 
              looking to practice your skills, our platform offers the perfect environment to enjoy 
              <strong> Geometry Dash Lite</strong> at its finest.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Start Playing Now!</h3>
              <p className="text-green-700">
                Ready to test your reflexes and rhythm skills? Jump into <strong>Geometry Dash Lite</strong> right now and 
                experience one of the most addictive platformer games ever created. Your geometric adventure awaits!
              </p>
            </div>
          </div>
        </div>

        {/* Game Description - 修改为不显示游戏标题的版本 */}
        <div className="mt-6">
          <GameDescription game={mainGame} hideTitle={true} />
        </div>
      </div>
    </Layout>
  );
} 