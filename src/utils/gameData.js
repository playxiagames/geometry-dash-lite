import gamesData from '../data/games.json';
import categoriesData from '../data/categories.json';
import siteConfig from '../data/siteConfig.json';

// 获取所有游戏
export const getAllGames = () => {
  return sortGamesByPriority([...gamesData.games]);
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
  const categoryGames = gamesData.games.filter(game => game.category === category);
  return sortGamesByPriority(categoryGames);
};

// 获取精选游戏 - 从 siteConfig.json 的 featuredGames 字段获取
export const getFeaturedGames = () => {
  const featuredGameIds = siteConfig.homepage.featuredGames || [];
  const featuredGames = gamesData.games.filter(game => featuredGameIds.includes(game.id));
  return sortGamesByPriority(featuredGames);
};

// 获取流行游戏 - 从 siteConfig.json 的 popularGames 字段获取
export const getPopularGames = () => {
  const popularGameIds = siteConfig.homepage.popularGames || [];
  const popularGames = gamesData.games.filter(game => popularGameIds.includes(game.id));
  return sortGamesByPriority(popularGames);
};

// 获取相关游戏 - 从 games.json 中每个游戏的 relatedGameIds 字段获取
export const getRelatedGames = (gameId, excludeId = null) => {
  const game = gamesData.games.find(g => g.id === gameId);
  if (!game || !game.relatedGameIds) {
    return [];
  }
  
  const relatedGames = gamesData.games.filter(g => 
    game.relatedGameIds.includes(g.id) && g.id !== excludeId
  );
  return sortGamesByPriority(relatedGames);
};

// 搜索游戏
export const searchGames = (query) => {
  const searchTerm = query.toLowerCase();
  const searchResults = gamesData.games.filter(game =>
    game.title.toLowerCase().includes(searchTerm) ||
    game.description.toLowerCase().includes(searchTerm) ||
    game.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
  return sortGamesByPriority(searchResults);
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

// 游戏排序函数 - 根据 hot、new 标签和 playCount、rating 排序
export const sortGamesByPriority = (games) => {
  const hotGames = siteConfig.homepage.hotGames || [];
  const newGames = siteConfig.homepage.newGames || [];
  
  return games.sort((a, b) => {
    const aIsHot = hotGames.includes(a.id);
    const aIsNew = newGames.includes(a.id);
    const bIsHot = hotGames.includes(b.id);
    const bIsNew = newGames.includes(b.id);
    
    // 计算优先级：hot+new=3, hot=2, new=1, 无=0
    const aPriority = (aIsHot ? 2 : 0) + (aIsNew ? 1 : 0);
    const bPriority = (bIsHot ? 2 : 0) + (bIsNew ? 1 : 0);
    
    // 如果优先级不同，按优先级排序
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    // 同优先级内，先按 playCount 排序
    if (a.playCount !== b.playCount) {
      return b.playCount - a.playCount;
    }
    
    // playCount 相同时，按 rating 排序
    return b.rating - a.rating;
  });
}; 