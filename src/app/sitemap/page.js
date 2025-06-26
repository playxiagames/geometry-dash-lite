import Link from 'next/link';
import { getAllGames, getAllCategories } from '../../utils/gameData';
import { generatePageMetadata } from '../../utils/seoUtils';

// 生成页面 metadata
export async function generateMetadata() {
  return generatePageMetadata({
    title: '网站地图 - 所有页面导航',
    description: '查看 Geometry Dash Lite 游戏网站的完整页面结构，包括所有游戏、分类和重要页面的导航链接。',
    path: '/sitemap'
  });
}

export default function SitemapPage() {
  const games = getAllGames();
  const categories = getAllCategories();

  // 静态页面
  const staticPages = [
    { title: '首页', url: '/', description: '探索最好玩的在线游戏', icon: '🏠' },
    { title: '关于我们', url: '/about', description: '了解我们的使命和团队', icon: 'ℹ️' },
    { title: '联系我们', url: '/contact', description: '与我们取得联系', icon: '📧' },
    { title: '隐私政策', url: '/privacy', description: '了解我们如何保护您的隐私', icon: '🔒' },
    { title: '服务条款', url: '/terms', description: '查看我们的服务条款', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-2xl">🗺️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">网站地图</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            探索我们网站的所有内容，快速找到您想要的游戏和信息
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{staticPages.length}</div>
            <div className="text-gray-600">主要页面</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{categories.length}</div>
            <div className="text-gray-600">游戏分类</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{games.length}</div>
            <div className="text-gray-600">精选游戏</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{staticPages.length + categories.length + games.length}</div>
            <div className="text-gray-600">总页面数</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 主要页面 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🏠</span>
                主要页面
              </h2>
              <div className="space-y-4">
                {staticPages.map((page, index) => (
                  <Link
                    key={index}
                    href={page.url}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                        {page.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {page.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 游戏分类 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🎮</span>
                游戏分类
              </h2>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/category/${category.slug}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                        {category.icon || '🎯'}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {category.description || `探索 ${category.name} 类游戏`}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 精选游戏 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🌟</span>
                精选游戏
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {games.map((game, index) => (
                  <Link
                    key={index}
                    href={`/games/${game.slug}`}
                    className="block p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                        <span className="text-white font-bold text-sm">
                          {game.title.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                          {game.title}
                        </h3>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500 text-sm mr-1">⭐</span>
                          <span className="text-sm text-gray-600">{game.rating}</span>
                          <span className="text-gray-400 mx-2">•</span>
                          <span className="text-sm text-gray-600 capitalize">{game.category}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">找不到您想要的内容？</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            我们持续添加新的游戏和内容。如果您有任何建议或找不到特定的游戏，请随时联系我们。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              📧 联系我们
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              🏠 返回首页
            </Link>
          </div>
        </div>

        {/* SEO Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>最后更新: {new Date().toLocaleDateString('zh-CN')}</p>
        </div>
      </div>
    </div>
  );
} 