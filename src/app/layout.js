import './globals.css'
import { getSiteConfig, getSEOConfig } from '../utils/gameData'
import { getTemplateConfig, getMetadataBaseUrl } from '../utils/templateConfig'

import { ThemeProvider } from '../contexts/ThemeContext'
import { FavoritesProvider } from '../contexts/FavoritesContext'


// Generate metadata from template configuration
const generateMetadata = () => {
  const templateConfig = getTemplateConfig();
  const siteName = templateConfig.site.name;
  const description = templateConfig.site.description;
  const siteUrl = templateConfig.site.url;
  const ogImage = templateConfig.branding.ogImage;
  
  return {
    title: siteName,
    description: description,
    authors: [{ name: templateConfig.site.shortName }],
    creator: templateConfig.site.shortName,
    publisher: templateConfig.site.shortName,

    metadataBase: getMetadataBaseUrl(),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      title: siteName,
      description: description,
      siteName: templateConfig.site.shortName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${templateConfig.site.shortName} - Play Online Free`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

export const metadata = generateMetadata();

export default function RootLayout({ children }) {
  const seoConfig = getSEOConfig()
  const gaId = seoConfig?.googleAnalyticsId

  return (
    <html lang="en">
      <head>
        {/* Theme initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  document.documentElement.classList.toggle('dark', isDark);
                } catch (e) {
                  document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);
                }
              })();
            `,
          }}
        />
        
        {/* Performance optimization - preconnect to external domains */}
        <link rel="preconnect" href="https://1games.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://scratch.mit.edu" crossOrigin="anonymous" />
        {gaId && process.env.NODE_ENV === 'production' && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />
          </>
        )}
        
        {/* 预加载关键CSS */}
        <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
        
        {/* 优化字体加载 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and manifest */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA configuration */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-title" content={getTemplateConfig().site.shortName} />
        
        {/* Google Analytics */}
        {gaId && process.env.NODE_ENV === 'production' && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_title: document.title,
                    page_location: window.location.href,
                    anonymize_ip: true,
                    send_page_view: true
                  });
                  
                  // Simplified game tracking functions for backward compatibility
                  window.trackGameStart = function(gameName) {
                    if (typeof gtag === 'function' && gameName) {
                      gtag('event', 'game_start', {
                        event_category: 'Game',
                        event_label: gameName,
                        value: 1
                      });
                    }
                  };
                  
                  window.trackFavorite = function(action, gameName) {
                    if (typeof gtag === 'function' && action && gameName) {
                      gtag('event', 'favorite_' + action, {
                        event_category: 'Engagement',
                        event_label: gameName,
                        value: action === 'add' ? 1 : -1
                      });
                    }
                  };
                `,
              }}
            />
          </>
        )}
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": getTemplateConfig().site.shortName,
              "url": getTemplateConfig().site.url,
              "description": getTemplateConfig().site.description
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 