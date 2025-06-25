import { notFound } from 'next/navigation';
import Layout from '../../components/Layout';
import GamePlayer from '../../components/GamePlayer';
import { GameGrid, SidebarGameList } from '../../components/GameCard';
import { GameDescription } from '../../components/Layout';
import { Breadcrumb } from '../../components/Navigation';
import { 
  getGameBySlug, 
  getRandomGames,
  generateGameMetadata 
} from '../../utils/gameData';

// 验证游戏 slug 是否有效
function isValidGameSlug(slug) {
  // 检查是否包含文件扩展名
  if (/\.(txt|xml|json|pdf|doc|docx|html|css|js)$/i.test(slug)) {
    return false;
  }
  
  // 检查是否包含特殊字符（只允许字母、数字、连字符）
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return false;
  }
  
  return true;
}

// 生成元数据
export async function generateMetadata({ params }) {
  // 验证 slug 格式
  if (!isValidGameSlug(params.gameSlug)) {
    return {
      title: 'Invalid Game URL',
      description: 'The requested game URL format is invalid.'
    };
  }
  
  const game = getGameBySlug(params.gameSlug);
  
  if (!game) {
    return {
      title: 'Game Not Found',
      description: 'The requested game could not be found.'
    };
  }

  return generateGameMetadata(game);
}

// 生成静态参数
export async function generateStaticParams() {
  // 导入游戏数据
  const gamesData = await import('../../data/games.json');
  const games = gamesData.games || [];
  
  // 返回所有游戏的slug参数，只包含有效的slug
  return games
    .filter(game => isValidGameSlug(game.slug))
    .map((game) => ({
      gameSlug: game.slug
    }));
}

export default function GamePage({ params }) {
  // 验证 slug 格式
  if (!isValidGameSlug(params.gameSlug)) {
    notFound();
  }
  
  const game = getGameBySlug(params.gameSlug);

  if (!game) {
    notFound();
  }

  // 获取相关游戏
  const relatedGames = getRandomGames(8, game.id);
  const moreGames = getRandomGames(12, game.id);

  // 面包屑导航
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: game.title }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb */}
        {/* <Breadcrumb items={breadcrumbItems} className="mb-6" /> */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Game Player */}
          <div className="lg:col-span-3">
            <GamePlayer game={game} />
          </div>

          {/* Sidebar - Related Games */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              {/* <h2 className="text-xl font-bold text-gray-900 mb-4">🎮 More Games</h2> */}
              <SidebarGameList games={relatedGames} />
            </div>
          </div>
        </div>

        {/* Game Description */}
        <div className="mt-8">
          <GameDescription game={game} />
        </div>

        {/* More Games Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🕹️ You May Also Like</h2>
          </div>
          <GameGrid games={moreGames} />
        </div>

      </div>
    </Layout>
  );
} 