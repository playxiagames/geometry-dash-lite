'use client';

import Navigation from './Navigation';
import { getFooterConfig, getSiteConfig } from '../utils/gameData';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

// Footer Component
const Footer = () => {
  const footerConfig = getFooterConfig();
  const siteConfig = getSiteConfig();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">🐍</span>
              <h3 className="text-xl font-bold">{siteConfig.shortName}</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                📷
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  🐍 Snake Game
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  🕹️ Arcade Games
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  🧩 Puzzle Games
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  🚀 Action Games
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerConfig.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-white transition-colors"
                    target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {footerConfig.copyright}
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Made with ❤️ for gamers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Game Description Component
export const GameDescription = ({ game, className = '' }) => {
  if (!game) return null;

  return (
    <div className={`game-description bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Game Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{game.title}</h1>
          <p className="text-lg text-gray-600">{game.description}</p>
        </div>

        {/* Game Stats */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-full">
            <span className="text-yellow-600 mr-2">⭐</span>
            <span className="font-medium">{game.rating} Rating</span>
          </div>
          <div className="flex items-center bg-blue-50 px-3 py-2 rounded-full">
            <span className="text-blue-600 mr-2">🎮</span>
            <span className="font-medium">{game.playCount > 1000000 ? `${(game.playCount/1000000).toFixed(1)}M` : `${Math.floor(game.playCount/1000)}K`} Plays</span>
          </div>
          <div className="flex items-center bg-green-50 px-3 py-2 rounded-full">
            <span className="text-green-600 mr-2">🏷️</span>
            <span className="font-medium capitalize">{game.category}</span>
          </div>
        </div>

        {/* Game Tags */}
        {game.tags && game.tags.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Long Description */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-700 leading-relaxed">
            {game.longDescription}
          </p>
        </div>

        {/* How to Play */}
        {game.controls && game.controls.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎮 How to Play</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-3">
                {game.controls.map((control, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{control}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Game Tips */}
        {game.tips && game.tips.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Game Tips</h2>
            <div className="bg-yellow-50 rounded-lg p-6">
              <ul className="space-y-3">
                {game.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 text-yellow-500 mr-3 mt-1">💡</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">❓ Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">How do I play {game.title}?</h3>
              <p className="text-gray-600">{game.description} Use the controls shown above to get started!</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Is {game.title} free to play?</h3>
              <p className="text-gray-600">Yes! {game.title} is completely free to play online. No downloads or installations required.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Can I play {game.title} on mobile?</h3>
              <p className="text-gray-600">Yes, {game.title} works on mobile devices and tablets. The game is optimized for touch controls.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout; 