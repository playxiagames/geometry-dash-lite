import gamesData from '../data/games.json';
import categoriesData from '../data/categories.json';
import siteConfig from '../data/siteConfig.json';

// 游戏相关函数
export const getAllGames = () => {
  return gamesData.games;
};

export const getGameById = (id) => {
  return gamesData.games.find(game => game.id === id);
};

export const getGameBySlug = (slug) => {
  return gamesData.games.find(game => game.slug === slug);
};

export const getGamesByCategory = (category) => {
  return gamesData.games.filter(game => 
    game.category === category || (game.tags && game.tags.includes(category))
  );
};

export const getFeaturedGames = () => {
  const featuredIds = siteConfig.homepage.featuredGames || [];
  return gamesData.games.filter(game => featuredIds.includes(game.id));
};

export const searchGames = (query) => {
  if (!query) return gamesData.games;
  
  const searchTerm = query.toLowerCase();
  return gamesData.games.filter(game => 
    game.title.toLowerCase().includes(searchTerm) ||
    game.description.toLowerCase().includes(searchTerm) ||
    (game.tags && game.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
};

export const getRandomGames = (count = 6, excludeId = null) => {
  const games = gamesData.games.filter(game => game.id !== excludeId);
  return games.slice(0, count);
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

// 工具函数
export const formatPlayCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const formatRating = (rating) => {
  return rating.toFixed(1);
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

// 获取 Geometry Dash 系列游戏
export const getGeometryDashGames = () => {
  const geometryDashGames = gamesData.games.filter(game => game.category === 'geometry-dash');
  return sortGamesByPriority(geometryDashGames);
};

// 获取侧边栏推荐游戏 - 同系列游戏 + 热门游戏的组合
export const getSidebarRecommendedGames = (mainGameId, count = 8) => {
  const mainGame = getGameById(mainGameId);
  if (!mainGame) return getRandomGames(count);

  // 先获取同系列游戏（相关游戏）
  const relatedGames = getRelatedGames(mainGameId, mainGameId);
  
  // 如果同系列游戏不够，补充热门游戏
  if (relatedGames.length >= count) {
    return relatedGames.slice(0, count);
  }
  
  // 获取热门游戏来补充，排除已有的游戏
  const hotGameIds = siteConfig.homepage.hotGames || [];
  const existingIds = [mainGameId, ...relatedGames.map(g => g.id)];
  const additionalHotGames = gamesData.games
    .filter(game => hotGameIds.includes(game.id) && !existingIds.includes(game.id))
    .slice(0, count - relatedGames.length);
  
  return [...relatedGames, ...additionalHotGames];
};

// 获取分类游戏预览 - 每个顶级分类显示几个代表游戏
export const getCategoryPreviewGames = (categoryId, count = 4) => {
  const categoryGames = getGamesByCategory(categoryId);
  return categoryGames.slice(0, count);
};

// 获取首页"更多游戏"区域的游戏 - 修复水合错误，使用确定性排序
export const getMoreGamesForHomepage = (excludeGameIds = [], count = 12) => {
  // 排除指定的游戏ID
  const availableGames = gamesData.games.filter(game => !excludeGameIds.includes(game.id));
  
  // 使用确定性排序而不是随机排序，避免水合错误
  // 基于游戏标题长度和ID的组合来创建伪随机效果
  const pseudoRandomSorted = availableGames.sort((a, b) => {
    const aValue = a.title.length + a.id.charCodeAt(0);
    const bValue = b.title.length + b.id.charCodeAt(0);
    return aValue - bValue;
  });
  
  return pseudoRandomSorted.slice(0, count);
}; 