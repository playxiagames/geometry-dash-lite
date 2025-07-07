/**
 * Template Configuration Utility
 * Provides centralized configuration management with environment variable support
 */

// Default configuration for the template
const DEFAULT_CONFIG = {
  site: {
    name: "Game Site Template",
    shortName: "Game Site",
    description: "Play games online for free! Collection of fun and entertaining games you can play directly in your browser.",
    url: "https://your-domain.com",
    mainGameId: "game-1",
    contactEmail: "contact@your-domain.com"
  },
  branding: {
    primaryColor: "blue",
    accentColor: "purple",
    ogImage: "/images/og-image.jpg"
  },
  seo: {
    googleAnalyticsId: null
  },
  external: {
    imageDomains: ["your-cdn.com"],
    gameSources: ["iframe", "scratch", "external"]
  },
  social: {
    twitter: "",
    facebook: "",
    github: ""
  },
  features: {
    enableFavorites: true,
    enableAnalytics: true,
    enableThemeToggle: true
  }
};

/**
 * Get template configuration from environment variables with fallbacks
 */
export const getTemplateConfig = () => {
  // Helper function to parse comma-separated strings
  const parseList = (str, defaultList = []) => {
    if (!str) return defaultList;
    return str.split(',').map(item => item.trim()).filter(Boolean);
  };

  // Helper function to parse boolean strings
  const parseBoolean = (str, defaultValue = false) => {
    if (str === undefined || str === null) return defaultValue;
    return str.toLowerCase() === 'true';
  };

  return {
    site: {
      name: process.env.NEXT_PUBLIC_SITE_NAME || DEFAULT_CONFIG.site.name,
      shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME || DEFAULT_CONFIG.site.shortName,
      description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || DEFAULT_CONFIG.site.description,
      url: process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_CONFIG.site.url,
      mainGameId: process.env.NEXT_PUBLIC_MAIN_GAME_ID || DEFAULT_CONFIG.site.mainGameId,
      contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || DEFAULT_CONFIG.site.contactEmail
    },
    branding: {
      primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || DEFAULT_CONFIG.branding.primaryColor,
      accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR || DEFAULT_CONFIG.branding.accentColor,
      ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || DEFAULT_CONFIG.branding.ogImage
    },
    seo: {
      googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || DEFAULT_CONFIG.seo.googleAnalyticsId
    },
    external: {
      imageDomains: parseList(process.env.NEXT_PUBLIC_IMAGE_DOMAINS, DEFAULT_CONFIG.external.imageDomains),
      gameSources: parseList(process.env.NEXT_PUBLIC_GAME_SOURCES, DEFAULT_CONFIG.external.gameSources)
    },
    social: {
      twitter: process.env.NEXT_PUBLIC_TWITTER_URL || DEFAULT_CONFIG.social.twitter,
      facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || DEFAULT_CONFIG.social.facebook,
      github: process.env.NEXT_PUBLIC_GITHUB_URL || DEFAULT_CONFIG.social.github
    },
    features: {
      enableFavorites: parseBoolean(process.env.NEXT_PUBLIC_ENABLE_FAVORITES, DEFAULT_CONFIG.features.enableFavorites),
      enableAnalytics: parseBoolean(process.env.NEXT_PUBLIC_ENABLE_ANALYTICS, DEFAULT_CONFIG.features.enableAnalytics),
      enableThemeToggle: parseBoolean(process.env.NEXT_PUBLIC_ENABLE_THEME_TOGGLE, DEFAULT_CONFIG.features.enableThemeToggle)
    }
  };
};

/**
 * Generate canonical URL
 */
export const generateCanonicalUrl = (path = '') => {
  const config = getTemplateConfig();
  const baseUrl = config.site.url.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

/**
 * Get metadata base URL for Next.js
 */
export const getMetadataBaseUrl = () => {
  const config = getTemplateConfig();
  return new URL(config.site.url);
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (featureName) => {
  const config = getTemplateConfig();
  return config.features[featureName] || false;
};

/**
 * Get external domains for Next.js image configuration
 */
export const getExternalImageDomains = () => {
  const config = getTemplateConfig();
  return config.external.imageDomains;
}; 