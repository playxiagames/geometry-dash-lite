'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSiteConfig, getNavigationConfig } from '../utils/gameData';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const siteConfig = getSiteConfig();
  const navigationConfig = getNavigationConfig();

  const handleNavigationClick = (item) => {
    router.push(item.url);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveItem = (item) => {
    if (item.url === '/' && pathname === '/') return true;
    if (item.url !== '/' && pathname === item.url) return true;
    return false;
  };

  return (
    <nav className="top-navigation bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={() => router.push('/')}
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                <span className="text-2xl mr-2">🐍</span>
                {siteConfig.shortName}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              
              {/* Navigation Items */}
              {navigationConfig.topItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigationClick(item)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveItem(item)
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.type === 'category' && (
                    <span className="mr-1">
                      {item.id === 'arcade' && '🕹️'}
                      {item.id === 'puzzle' && '🧩'}
                      {item.id === 'shooter' && '🚀'}
                      {item.id === 'racing' && '🏎️'}
                      {item.id === 'action' && '⚡'}
                    </span>
                  )}
                  {item.type === 'game' && (
                    <span className="mr-1">
                      {item.id === 'snake-game' && '🐍'}
                      {item.id === 'tetris' && '🔷'}
                      {item.id === 'pac-man' && '👻'}
                    </span>
                  )}
                  {item.title}
                </button>
              ))}

              {/* Search Button */}
              <button className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                🔍 Search
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
              
              {/* Navigation Items */}
              {navigationConfig.topItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigationClick(item)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActiveItem(item)
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.type === 'category' && (
                    <span className="mr-2">
                      {item.id === 'arcade' && '🕹️'}
                      {item.id === 'puzzle' && '🧩'}
                      {item.id === 'shooter' && '🚀'}
                      {item.id === 'racing' && '🏎️'}
                      {item.id === 'action' && '⚡'}
                    </span>
                  )}
                  {item.type === 'game' && (
                    <span className="mr-2">
                      {item.id === 'snake-game' && '🐍'}
                      {item.id === 'tetris' && '🔷'}
                      {item.id === 'pac-man' && '👻'}
                    </span>
                  )}
                  {item.title}
                </button>
              ))}

              {/* Search */}
              <button className="block w-full text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors">
                🔍 Search Games
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Breadcrumb Component
export const Breadcrumb = ({ items, className = '' }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className={`breadcrumb ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="hover:text-gray-700 transition-colors"
                onClick={item.onClick}
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Category Badge Component
export const CategoryBadge = ({ category, isActive = false, className = '' }) => {
  return (
    <a
      href={`/games/${category.slug}`}
      className={`category-badge inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-blue-500 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
      } ${className}`}
      style={isActive ? {} : { backgroundColor: category.color + '20', color: category.color }}
    >
      <span className="mr-2">{category.icon}</span>
      {category.name}
      {category.gameCount > 0 && (
        <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
          {category.gameCount}
        </span>
      )}
    </a>
  );
};

export default Navigation;