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
  },
}

export default function RootLayout({ children }) {
  const seoConfig = getSEOConfig()
  const gaId = seoConfig?.googleAnalyticsId

  return (
    <html lang="en">
      <head>
        {/* 简化的主题初始化脚本 */}
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
        
        {/* 精简的性能优化 - 只保留关键域名 */}
        <link rel="preconnect" href="https://images.geometry-dash-lite.org" />
        {gaId && process.env.NODE_ENV === 'production' && (
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        )}
        
        {/* 基础favicon和manifest */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* 简化的PWA配置 */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-title" content="Geometry Dash Lite" />
        
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
        
        {/* 简化的结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Geometry Dash Lite",
              "url": "https://geometry-dash-lite.org/",
              "description": "Play Geometry Dash Lite online for free! Jump and fly your way through danger in this rhythm-based action platformer."
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