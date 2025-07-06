import { getAllGames, getAllCategories } from '../utils/gameData';

export default function sitemap() {
  const baseUrl = 'https://geometry-dash-lite.org';
  
  // 获取所有游戏和分类数据
  const games = getAllGames();
  const categories = getAllCategories();
  
  // 静态页面
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/all-games/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/sitemap/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 动态游戏页面
  const gamePages = games.map((game) => ({
    url: `${baseUrl}/games/${game.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 动态分类页面
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 合并所有页面
  return [
    ...staticPages,
    ...gamePages,
    ...categoryPages,
  ];
} 