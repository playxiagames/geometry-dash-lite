/**
 * SEO优化组件 - 提供结构化数据、内部链接和性能优化
 */

import { getRandomGames } from '../utils/gameData';

export function GameSEOStructuredData({ game }) {
  if (!game) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": game.title,
    "description": game.description,
    "url": `https://geometry-dash-lite.org/games/${game.slug}/`,
    "image": game.thumbnail,
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "genre": game.category || "Arcade",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free to play"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": game.rating || 4.5,
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": game.ratingCount || Math.floor(game.playCount / 1000) || 100
    },
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/PlayAction",
        "userInteractionCount": game.playCount || 0
      }
    ],
    "author": {
      "@type": "Organization",
      "name": "Geometry Dash Lite",
      "url": "https://geometry-dash-lite.org"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Geometry Dash Lite",
      "url": "https://geometry-dash-lite.org"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }) {
  if (!items || items.length === 0) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://geometry-dash-lite.org${item.href}` : undefined
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function RelatedGamesLinks({ currentGame, count = 6 }) {
  if (!currentGame) return null;

  const relatedGames = getRandomGames(count, currentGame.id);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        🎮 Related Games You Might Like
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {relatedGames.map((game) => (
          <a
            key={game.id}
            href={`/games/${game.slug}/`}
            className="group block p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            title={`Play ${game.title} - ${game.description}`}
          >
            <img
              src={game.thumbnail}
              alt={`${game.title} game thumbnail`}
              className="w-full h-20 object-cover rounded mb-2"
              loading="lazy"
              decoding="async"
            />
            <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {game.title}
            </h4>
            <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>⭐ {game.rating}</span>
              <span className="ml-2">👥 {(game.playCount / 1000).toFixed(0)}K</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function CategoryLinksWidget({ currentCategory }) {
  const categories = [
    { id: 'geometry-dash', name: 'Geometry Dash', slug: 'geometry-dash' },
    { id: 'google-games', name: 'Google Games', slug: 'google-games' },
    { id: 'js13k-games', name: 'JS13K Games', slug: 'js13k-games' }
  ];

  const relevantCategories = categories.filter(cat => cat.id !== currentCategory);

  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-3 text-gray-900 dark:text-white">
        🏷️ Browse by Category
      </h3>
      <div className="flex flex-wrap gap-2">
        {relevantCategories.map((category) => (
          <a
            key={category.id}
            href={`/category/${category.slug}/`}
            className="inline-block px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full transition-colors"
            title={`Browse ${category.name} games`}
          >
            {category.name}
          </a>
        ))}
        <a
          href="/all-games/"
          className="inline-block px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full transition-colors"
          title="View all games"
        >
          View All Games
        </a>
      </div>
    </div>
  );
}

export function InternalLinksOptimizer({ game, showGuideLink = true }) {
  if (!game) return null;

  const links = [
    {
      href: "/",
      text: "🏠 Home",
      title: "Back to homepage - Play free online games"
    },
    {
      href: "/all-games/",
      text: "🎮 All Games",
      title: "Browse all free online games"
    }
  ];

  if (game.category) {
    const categoryMap = {
      'geometry-dash': 'Geometry Dash',
      'google-games': 'Google Games',
      'js13k-games': 'JS13K Games'
    };
    
    const categoryName = categoryMap[game.category] || game.category;
    links.push({
      href: `/category/${game.category}/`,
      text: `📁 ${categoryName}`,
      title: `Browse ${categoryName} games`
    });
  }

  if (showGuideLink && game.guideFile) {
    links.push({
      href: `#game-guide`,
      text: "📖 Strategy Guide",
      title: `${game.title} complete strategy guide and tips`
    });
  }

  return (
    <nav className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex flex-wrap gap-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="inline-flex items-center px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title={link.title}
          >
            {link.text}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function GameMetaTags({ game }) {
  if (!game) return null;

  const keywords = [
    game.title,
    ...(game.tags || []),
    'online game',
    'free game',
    'browser game',
    'no download'
  ].join(', ');

  return (
    <>
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="game" />
      <meta property="og:game:genre" content={game.category || 'Arcade'} />
      <meta property="game:rating" content={game.rating} />
      <meta name="twitter:app:country" content="US" />
      <link rel="canonical" href={`https://geometry-dash-lite.org/games/${game.slug}/`} />
    </>
  );
}

export default {
  GameSEOStructuredData,
  BreadcrumbStructuredData,
  RelatedGamesLinks,
  CategoryLinksWidget,
  InternalLinksOptimizer,
  GameMetaTags
};