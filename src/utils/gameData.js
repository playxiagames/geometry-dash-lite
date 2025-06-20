import gamesData from '../data/games.json';
import categoriesData from '../data/categories.json';
import siteConfig from '../data/siteConfig.json';

// 获取所有游戏
export const getAllGames = () => {
  return gamesData.games;
};

// 根据ID获取游戏
export const getGameById = (id) => {
  return gamesData.games.find(game => game.id === id);
};

// 根据slug获取游戏
export const getGameBySlug = (slug) => {
  return gamesData.games.find(game => game.slug === slug);
};

// 根据分类获取游戏
export const getGamesByCategory = (category) => {
  return gamesData.games.filter(game => game.category === category);
};

// 获取精选游戏
export const getFeaturedGames = () => {
  return gamesData.games.filter(game => game.isFeatured);
};

// 获取热门游戏
export const getPopularGames = () => {
  return gamesData.games.filter(game => game.isPopular)
    .sort((a, b) => b.playCount - a.playCount);
};

// 获取相关游戏
export const getRelatedGames = (gameIds, excludeId = null) => {
  return gamesData.games.filter(game => 
    gameIds.includes(game.id) && game.id !== excludeId
  );
};

// 搜索游戏
export const searchGames = (query) => {
  const searchTerm = query.toLowerCase();
  return gamesData.games.filter(game =>
    game.title.toLowerCase().includes(searchTerm) ||
    game.description.toLowerCase().includes(searchTerm) ||
    game.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// 获取随机游戏
export const getRandomGames = (count = 6, excludeId = null) => {
  const games = gamesData.games.filter(game => game.id !== excludeId);
  const shuffled = games.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 分类相关函数
export const getAllCategories = () => {
  return categoriesData.categories;
};

export const getCategoryById = (id) => {
  return categoriesData.categories.find(category => category.id === id);
};

export const getCategoryBySlug = (slug) => {
  return categoriesData.categories.find(category => category.slug === slug);
};

export const getTopLevelCategories = () => {
  return categoriesData.categories.filter(category => category.isTopLevel);
};

// 站点配置
export const getSiteConfig = () => {
  return siteConfig.site;
};

export const getHomepageConfig = () => {
  return siteConfig.homepage;
};

export const getNavigationConfig = () => {
  return siteConfig.navigation;
};

export const getSEOConfig = () => {
  return siteConfig.seo;
};

export const getFooterConfig = () => {
  return siteConfig.footer;
};

// 生成游戏页面的元数据
export const generateGameMetadata = (game) => {
  const seoConfig = getSEOConfig();
  return {
    title: `${game.title} - Play ${game.title} Online Free`,
    description: game.description,
    keywords: game.tags.join(', '),
    openGraph: {
      title: game.title,
      description: game.description,
      type: 'website',
      images: [
        {
          url: game.screenshot,
          width: 800,
          height: 600,
          alt: `${game.title} Screenshot`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: game.title,
      description: game.description,
      images: [game.screenshot]
    }
  };
};

// 生成分类页面的元数据
export const generateCategoryMetadata = (category) => {
  return {
    title: `${category.name} - Free Online ${category.name}`,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
      type: 'website'
    }
  };
};

// 格式化播放次数
export const formatPlayCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

// 格式化评分
export const formatRating = (rating) => {
  return rating.toFixed(1);
};

// 生成星级评分
export const generateStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: emptyStars
  };
}; 