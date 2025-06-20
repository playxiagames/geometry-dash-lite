import './globals.css'
import { getSiteConfig, getSEOConfig } from '../utils/gameData'

export const metadata = {
  title: 'Snake Game - Play Classic Snake Online Free',
  description: 'Play the classic Snake game online for free! Control the snake to eat food and grow longer. No download required, play directly in your browser.',
  keywords: 'snake game, classic games, arcade games, online games, free games, browser games',
  authors: [{ name: 'Snake Game Online' }],
  creator: 'Snake Game Online',
  publisher: 'Snake Game Online',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://snake-game-site.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://snake-game-site.vercel.app',
    title: 'Snake Game - Play Classic Snake Online Free',
    description: 'Play the classic Snake game online for free! Control the snake to eat food and grow longer. No download required, play directly in your browser.',
    siteName: 'Snake Game Online',
    images: [
      {
        url: '/images/og-snake-game.jpg',
        width: 1200,
        height: 630,
        alt: 'Snake Game - Play Online Free',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snake Game - Play Classic Snake Online Free',
    description: 'Play the classic Snake game online for free! Control the snake to eat food and grow longer.',
    images: ['/images/og-snake-game.jpg'],
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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Snake Game" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://snake-game-site.vercel.app/#website",
              "url": "https://snake-game-site.vercel.app",
              "name": "Snake Game Online",
              "description": "Play the classic Snake game online for free! Control the snake to eat food and grow longer.",
              "publisher": {
                "@type": "Organization",
                "name": "Snake Game Online"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://snake-game-site.vercel.app/search?q={search_term_string}"
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
              "name": "Snake Game",
              "description": "Classic Snake Game - Control the snake to eat food and grow longer without hitting walls or yourself!",
              "url": "https://snake-game-site.vercel.app",
              "image": "https://snake-game-site.vercel.app/images/snake-game-screenshot.jpg",
              "author": {
                "@type": "Organization",
                "name": "Snake Game Online"
              },
              "gameItem": {
                "@type": "Thing",
                "name": "Snake Game"
              },
              "genre": "Arcade",
              "audience": {
                "@type": "Audience",
                "audienceType": "General Audience"
              },
              "operatingSystem": "Web Browser",
              "applicationCategory": "Game",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
        
        {/* Analytics Script Placeholder */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
} 