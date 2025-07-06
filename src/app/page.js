'use client';

import Layout from '../components/Layout';
import GamePlayer from '../components/GamePlayer';
import { GameGrid, SidebarGameList } from '../components/GameCard';
import { GameDescription } from '../components/Layout';
import { 
  getGameById, 
  getHomepageConfig,
  getSidebarRecommendedGames,
  getFeaturedGames,
  getPopularGames, 
  getGeometryDashGames,
  getCategoryPreviewGames,
  getAllCategories,
  getMoreGamesForHomepage,
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🎮 Geometry Dash Lite
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
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
  
  // 获取各种游戏数据
  const sidebarGames = getSidebarRecommendedGames(mainGame.id, 7);
  const geometryDashGames = getGeometryDashGames();
  const featuredGames = getFeaturedGames();
  const popularGames = getPopularGames();
  const allGames = getAllGames(); // 用于获取游戏总数
  
  // 获取分类预览游戏
  const categories = getAllCategories();
  const googleGamesPreview = getCategoryPreviewGames('google-games', 4);
  const js13kGamesPreview = getCategoryPreviewGames('js13k-games', 4);

  // 收集已展示的游戏ID，用于排除重复
  const displayedGameIds = [
    mainGame.id,
    ...sidebarGames.map(g => g.id),
    ...geometryDashGames.map(g => g.id),
    ...featuredGames.map(g => g.id),
    ...popularGames.map(g => g.id),
    ...googleGamesPreview.map(g => g.id),
    ...js13kGamesPreview.map(g => g.id)
  ];

  // 获取更多游戏，排除已展示的
  const moreGames = getMoreGamesForHomepage(displayedGameIds, 12);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* Main Game Player */}
          <div className="lg:col-span-3">
            <GamePlayer game={mainGame} />
          </div>

          {/* Sidebar - Optimized Recommendations */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <SidebarGameList 
                games={sidebarGames} 
                title="🎯 Recommended For You" 
              />
            </div>
          </div>
        </div>

        {/* Geometry Dash 系列专区 - 核心产品展示 */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-left">
              🎮 Complete Geometry Dash Collection
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {geometryDashGames.length} games
            </span>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              🚀 Experience all versions of the legendary rhythm-based platformer! From the classic Geometry Dash Lite to advanced versions with unique challenges.
            </p>
          </div>
          <GameGrid games={geometryDashGames} />
        </div>

        {/* Featured Games Grid */}
        {/* <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-left">⭐ Editor's Choice</h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              🏆 Handpicked games that deliver exceptional gaming experiences across different genres.
            </p>
          </div>
          <GameGrid games={featuredGames} />
        </div> */}

        {/* Popular Games Grid */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-left">🔥 Trending Now</h2>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              📈 The most popular games right now - see what everyone else is playing!
            </p>
          </div>
          <GameGrid games={popularGames} />
        </div>

        {/* Category Previews - 引导用户探索更多分类 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-left">🎯 Explore More Game Categories</h2>
          
          {/* Google Games Preview */}
          {googleGamesPreview.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">🎲 Classic Google Games</h3>
                <a 
                  href="/category/google-games/"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                >
                  View All Google Games →
                </a>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  🕹️ Timeless arcade classics reimagined by Google - Pac-Man, Snake, Minesweeper and more!
                </p>
              </div>
              <GameGrid games={googleGamesPreview} gridCols="grid-cols-2 sm:grid-cols-4" />
            </div>
          )}

          {/* JS13K Games Preview */}
          {js13kGamesPreview.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">⚡ Minimalist JS13K Games</h3>
                <a 
                  href="/category/js13k-games/"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                >
                  View All JS13K Games →
                </a>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mb-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  💎 Incredible games built in just 13KB of code - showcasing creativity and technical mastery!
                </p>
              </div>
              <GameGrid games={js13kGamesPreview} gridCols="grid-cols-2 sm:grid-cols-4" />
            </div>
          )}
        </div>

        {/* More Games Discovery Section */}
        {moreGames.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-left">🎲 Discover More Games</h2>
              <a 
                href="/all-games/"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              >
                🔍 Search All Games →
              </a>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-3 mb-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                🔍 Looking for something specific? Visit our <strong>All Games</strong> page to search by name, browse by category, or filter by rating. Over {allGames.length}+ games to explore!
              </p>
            </div>
            <GameGrid games={moreGames} gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" />
          </div>
        )}

        {/* SEO Content Section - 主要H1标签 */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-left">
            Play Geometry Dash Lite - Free Online Game
          </h2>
          
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Welcome to the ultimate <strong>Geometry Dash Lite</strong> online experience! Our platform offers you the chance to play 
              <strong> Geometry Dash Lite</strong> directly in your web browser without any downloads or installations required. 
              This exciting rhythm-based platformer has captivated millions of players worldwide, and now you can enjoy 
              <strong> Geometry Dash Lite</strong> anytime, anywhere, completely free.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-6">
              What Makes Geometry Dash Lite Special?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Geometry Dash Lite</strong> is more than just a simple jumping game – it's a mesmerizing fusion of precise 
              platforming action and pulse-pounding electronic music. In <strong>Geometry Dash Lite</strong>, you control a geometric 
              character that must navigate through increasingly challenging obstacle courses. The game's unique appeal lies in how 
              the gameplay synchronizes perfectly with the background music, creating an immersive experience that makes 
              <strong> Geometry Dash Lite</strong> stand out from other online games.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-6">
              How to Play Geometry Dash Lite
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Playing <strong>Geometry Dash Lite</strong> on our platform is incredibly simple. Just click the play button above 
              and start your adventure immediately. The controls in <strong>Geometry Dash Lite</strong> are straightforward – 
              tap or click to make your character jump over obstacles and avoid deadly spikes. Timing is everything in 
              <strong> Geometry Dash Lite</strong>, as you'll need to sync your movements with the rhythm of the music to succeed.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-6">
              Features of Our Geometry Dash Lite Version
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Instant Play:</strong> No downloads needed to enjoy Geometry Dash Lite</li>
                <li><strong>Cross-Platform:</strong> Play Geometry Dash Lite on desktop, tablet, or mobile</li>
                <li><strong>Free Forever:</strong> Enjoy Geometry Dash Lite without any costs or subscriptions</li>
                <li><strong>Safe & Secure:</strong> Our Geometry Dash Lite version is completely safe to play</li>
                <li><strong>Regular Updates:</strong> We keep our Geometry Dash Lite game current and bug-free</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-6">
              Tips for Mastering Geometry Dash Lite
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Success in <strong>Geometry Dash Lite</strong> requires practice and patience. Start with the easier levels to get 
              familiar with the controls and rhythm patterns. As you progress in <strong>Geometry Dash Lite</strong>, you'll encounter 
              more complex obstacles and faster-paced sections. Remember, each attempt in <strong>Geometry Dash Lite</strong> is 
              a learning opportunity – analyze where you failed and adjust your timing accordingly.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-6">
              Why Choose Our Geometry Dash Lite Platform?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
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