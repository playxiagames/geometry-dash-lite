import './globals.css'
import { getSiteConfig, getSEOConfig } from '../utils/gameData'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { ThemeProvider } from '../contexts/ThemeContext'
import { FavoritesProvider } from '../contexts/FavoritesContext'
import PerformanceOptimizer from '../components/PerformanceOptimizer'

export const metadata = {
  title: 'Geometry Dash Lite - Play Geometry Dash Online Free',
  description: 'Play Geometry Dash Lite online for free! Ultimate rhythm-based platformer with challenging levels. No download required - play directly in your browser!',
  authors: [{ name: 'Geometry Dash Lite' }],
  creator: 'Geometry Dash Lite',
  publisher: 'Geometry Dash Lite',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://geometry-dash-lite.org/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://geometry-dash-lite.org/',
    title: 'Geometry Dash Lite - Play Geometry Dash Online Free',
    description: 'Play Geometry Dash Lite online for free! Ultimate rhythm-based platformer with challenging levels. No download required - play directly in your browser!',
    siteName: 'Geometry Dash Lite',
    images: [
      {
        url: '/images/og-geometry-dash-lite.jpg',
        width: 1200,
        height: 630,
        alt: 'Geometry Dash Lite - Play Online Free',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geometry Dash Lite - Play Geometry Dash Online Free',
    description: 'Play Geometry Dash Lite online for free! Ultimate rhythm-based platformer with challenging levels and amazing music.',
    images: ['/images/og-geometry-dash-lite.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  const seoConfig = getSEOConfig()
  const gaId = seoConfig?.googleAnalyticsId

  return (
    <html lang="en">
      <head>
        {/* 主题初始化脚本 - 防止闪烁 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var isDark = false;
                  
                  if (theme === 'dark') {
                    isDark = true;
                  } else if (theme === 'system') {
                    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }
                  
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // 如果出错，使用系统默认主题
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }
                }
              })();
            `,
          }}
        />
        
        {/* 性能优化 - DNS预获取和预连接 */}
        <link rel="dns-prefetch" href="//images.geometry-dash-lite.org" />
        <link rel="dns-prefetch" href="//1games.io" />
        <link rel="dns-prefetch" href="//scratch.mit.edu" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        <link rel="preconnect" href="https://images.geometry-dash-lite.org" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 关键资源预加载 */}
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />
        <link rel="modulepreload" href="/_next/static/chunks/pages/_app.js" />
        
        {/* 基础favicon和manifest */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA和性能相关meta标签 */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Geometry Dash Lite" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* 性能和缓存控制 */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="origin-when-cross-origin" />
        
        {/* 预获取关键游戏资源 */}
        <link rel="prefetch" href="/games/geometry-dash-lite/" />
        <link rel="prefetch" href="/games/dinosaur-game/" />
        <link rel="prefetch" href="/category/geometry-dash/" />
        
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
                  
                  // Game event tracking function
                  window.trackGameEvent = function(action, gameName, category) {
                    if (typeof gtag === 'function') {
                      gtag('event', action, {
                        event_category: category || 'Game',
                        event_label: gameName,
                        value: 1
                      });
                    }
                  };
                  
                  // Custom event tracking function
                  window.trackCustomEvent = function(eventName, parameters) {
                    if (typeof gtag === 'function') {
                      gtag('event', eventName, parameters || {});
                    }
                  };
                `,
              }}
            />
          </>
        )}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://geometry-dash-lite.org/#website",
              "url": "https://geometry-dash-lite.org/",
              "name": "Geometry Dash Lite",
              "description": "Play Geometry Dash Lite online for free! Jump and fly your way through danger in this rhythm-based action platformer.",
              "publisher": {
                "@type": "Organization",
                "name": "Geometry Dash Lite"
              },
                          "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://geometry-dash-lite.org/all-games/?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
            })
          }}
        />
        
        {/* Game Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Game",
              "name": "Geometry Dash Lite",
              "description": "Geometry Dash Lite - Jump and fly your way through danger in this rhythm-based action platformer!",
              "url": "https://geometry-dash-lite.org/",
              "image": "https://geometry-dash-lite.org/images/geometry-dash-lite-screenshot.jpg",
              "author": {
                "@type": "Organization",
                "name": "Geometry Dash Lite"
              },
              "gameItem": {
                "@type": "Thing",
                "name": "Geometry Dash Lite"
              },
              "genre": "Arcade",
              "audience": {
                "@type": "Audience",
                "audienceType": "Gamers"
              }
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <FavoritesProvider>
            <PerformanceOptimizer />
            {children}
          </FavoritesProvider>
        </ThemeProvider>
        
        {/* Client-side Google Analytics component */}
        <GoogleAnalytics />
      </body>
    </html>
  )
} 