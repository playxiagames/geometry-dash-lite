// SEO 工具函数
const BASE_URL = 'https://geometry-dash-lite.org';

/**
 * 截断文本到指定长度，保持完整单词
 * @param {string} text - 原始文本
 * @param {number} maxLength - 最大长度
 * @returns {string} - 截断后的文本
 */
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  
  // 截断到最大长度，然后找到最后一个空格
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  // 如果找到空格且不在开头，则在空格处截断
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace);
  }
  
  // 否则直接截断
  return truncated;
};

/**
 * 优化 title，确保长度 <= 60 字符
 * @param {string} title - 原始标题
 * @returns {string} - 优化后的标题
 */
const optimizeTitle = (title) => {
  return truncateText(title, 60);
};

/**
 * 优化 description，确保长度在 140-160 字符之间
 * @param {string} description - 原始描述
 * @returns {string} - 优化后的描述
 */
const optimizeDescription = (description) => {
  // 如果描述太短，保持原样
  if (description.length < 140) {
    return description;
  }
  
  // 如果描述长度在理想范围内，保持原样
  if (description.length >= 140 && description.length <= 160) {
    return description;
  }
  
  // 如果描述太长，截断到 160 字符
  return truncateText(description, 160);
};

/**
 * 生成 canonical URL
 * @param {string} path - 页面路径（例如：'/', '/geometry-dash-lite', '/about'）
 * @returns {string} - 完整的 canonical URL
 */
export const generateCanonicalUrl = (path) => {
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 移除重复的斜杠并确保以 / 结尾（除了根路径）
  const cleanPath = normalizedPath.replace(/\/+/g, '/');
  const finalPath = cleanPath === '/' ? '/' : `${cleanPath}/`;
  
  return `${BASE_URL}${finalPath}`;
};

/**
 * 生成页面的基础 metadata
 * @param {Object} options - 页面元数据选项
 * @returns {Object} - Next.js metadata 对象
 */
export const generatePageMetadata = ({
  title,
  description,
  path,
  ogImage = '/images/og-geometry-dash-lite.jpg',
  additionalMeta = {}
}) => {
  const canonicalUrl = generateCanonicalUrl(path);
  const fullTitle = title.includes('Geometry Dash Lite') 
    ? optimizeTitle(title)
    : optimizeTitle(`${title} | Geometry Dash Lite Online`);
  
  const optimizedDescription = optimizeDescription(description);
  
  return {
    title: fullTitle,
    description: optimizedDescription,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      title: fullTitle,
      description: optimizedDescription,
      siteName: 'Geometry Dash Lite Online',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: optimizedDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...additionalMeta,
  };
};

/**
 * 生成游戏页面的 metadata
 * @param {Object} game - 游戏对象
 * @returns {Object} - Next.js metadata 对象
 */
export const generateGamePageMetadata = (game) => {
  if (!game) {
    return generatePageMetadata({
      title: 'Game Not Found',
      description: 'The requested game could not be found. Browse our collection of free online games and find your next favorite to play.',
      path: '/404',
    });
  }

  // 优化游戏页面的 title 和 description
  const gameTitle = optimizeTitle(`Play ${game.title} Online Free`);
  const gameDescription = optimizeDescription(
    game.longDescription || 
    `Play ${game.title} online for free! ${game.description} No download required - start playing immediately in your browser.`
  );

  return generatePageMetadata({
    title: gameTitle,
    description: gameDescription,
    path: `/games/${game.slug}`,
    additionalMeta: {
      other: {
        'game:name': game.title,
        'game:category': game.category,
        'game:rating': game.rating.toString(),
        'game:play_count': game.playCount.toString(),
      }
    }
  });
};

/**
 * 生成分类页面的 metadata
 * @param {Object} category - 分类对象
 * @returns {Object} - Next.js metadata 对象
 */
export const generateCategoryPageMetadata = (category) => {
  if (!category) {
    return generatePageMetadata({
      title: 'Category Not Found',
      description: 'The requested game category could not be found. Explore our collection of free online games across multiple categories.',
      path: '/404',
    });
  }

  const categoryTitle = optimizeTitle(`${category.name} Games - Free Online ${category.name}`);
  const categoryDescription = optimizeDescription(
    `Play the best ${category.name.toLowerCase()} games online for free! ${category.description} No downloads required.`
  );

  return generatePageMetadata({
    title: categoryTitle,
    description: categoryDescription,
    path: `/category/${category.slug}`,
  });
};

/**
 * 生成结构化数据
 * @param {Object} options - 结构化数据选项
 * @returns {Object} - JSON-LD 结构化数据
 */
export const generateStructuredData = ({
  type = 'WebPage',
  name,
  description,
  url,
  additionalProperties = {}
}) => {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Geometry Dash Lite Online',
      url: BASE_URL,
    },
    ...additionalProperties,
  };

  return baseStructure;
}; 