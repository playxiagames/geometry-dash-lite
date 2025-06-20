// 路径工具函数 - 处理 GitHub Pages basePath

// 获取基础路径
export const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '/github-io-game' : '';
};

// 获取完整的资源路径
export const getAssetPath = (path) => {
  const basePath = getBasePath();
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};

// 获取页面路径
export const getPagePath = (path) => {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
};

// 用于图片路径
export const getImagePath = (imagePath) => {
  return getAssetPath(imagePath);
};

// 用于 API 路径
export const getApiPath = (apiPath) => {
  return getAssetPath(`/api${apiPath.startsWith('/') ? apiPath : `/${apiPath}`}`);
};

// 检查是否在生产环境
export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

// 获取完整的站点 URL
export const getSiteUrl = () => {
  if (isProduction()) {
    return 'https://playxiagames.github.io/github-io-game';
  }
  return 'http://localhost:3000';
}; 