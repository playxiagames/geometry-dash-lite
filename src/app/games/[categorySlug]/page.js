import { notFound } from 'next/navigation';
import Layout from '../../../components/Layout';
import { GameGrid } from '../../../components/GameCard';
import { Breadcrumb, CategoryBadge } from '../../../components/Navigation';
import { 
  getCategoryBySlug, 
  getGamesByCategory,
  getAllCategories,
  generateCategoryMetadata 
} from '../../../utils/gameData';

// 生成元数据
export async function generateMetadata({ params }) {
  const category = getCategoryBySlug(params.categorySlug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested game category could not be found.'
    };
  }

  return generateCategoryMetadata(category);
}

// 生成静态参数
export async function generateStaticParams() {
  // 导入分类数据
  const categoriesData = await import('../../../data/categories.json');
  const categories = categoriesData.categories || [];
  
  // 返回所有分类的slug参数
  return categories.map((category) => ({
    categorySlug: category.slug
  }));
}

export default function CategoryPage({ params }) {
  const category = getCategoryBySlug(params.categorySlug);

  if (!category) {
    notFound();
  }

  // 获取该分类的游戏
  const categoryGames = getGamesByCategory(category.id);
  const allCategories = getAllCategories();

  // 面包屑导航
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Games', href: '/games' },
    { label: category.name }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb */}
        {/* <Breadcrumb items={breadcrumbItems} className="mb-6" /> */}

        {/* Category Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <span className="text-6xl">{category.icon}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category.description}</p>
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {categoryGames.length} games available
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse Categories</h2>
          <div className="flex flex-wrap gap-3">
            {allCategories.map((cat) => (
              <CategoryBadge
                key={cat.id}
                category={cat}
                isActive={cat.id === category.id}
              />
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {category.icon} {category.name}
            </h2>
            <div className="text-sm text-gray-500">
              Showing {categoryGames.length} games
            </div>
          </div>
          
          {categoryGames.length > 0 ? (
            <GameGrid games={categoryGames} />
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No games found</h3>
              <p className="text-gray-600">There are no games in this category yet. Check back later!</p>
            </div>
          )}
        </div>

        {/* Category Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {category.name}</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              {category.longDescription || category.description}
            </p>
            
            {category.id === 'arcade' && (
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Arcade games are the heart of classic gaming. These games are designed to be easy to learn but challenging to master, 
                  offering quick gameplay sessions that keep you coming back for more. From the exciting rhythm-based Geometry Dash Lite to 
                  complex puzzle challenges, arcade games provide instant fun and entertainment.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Popular Arcade Game Features:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Simple, intuitive controls</li>
                  <li>Progressive difficulty levels</li>
                  <li>High score challenges</li>
                  <li>Quick game sessions</li>
                  <li>Immediate feedback and rewards</li>
                </ul>
              </div>
            )}

            {category.id === 'puzzle' && (
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Puzzle games challenge your mind and test your problem-solving skills. These games range from simple pattern matching 
                  to complex logical challenges that require strategic thinking and planning. Perfect for players who enjoy mental stimulation 
                  and want to exercise their brain while having fun.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefits of Puzzle Games:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Improve cognitive function</li>
                  <li>Enhance problem-solving skills</li>
                  <li>Boost memory and concentration</li>
                  <li>Reduce stress and anxiety</li>
                  <li>Provide sense of achievement</li>
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
} 