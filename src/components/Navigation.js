'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getSiteConfig, getNavigationConfig, searchGames, getAllCategories } from '../utils/gameData';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ games: [], categories: [] });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const siteConfig = getSiteConfig();
  const navigationConfig = getNavigationConfig();

  const handleNavigationClick = (item) => {
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 搜索功能
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ games: [], categories: [] });
      setSelectedIndex(0);
      return;
    }

    const timer = setTimeout(() => {
      const games = searchGames(searchQuery).slice(0, 5);
      const categories = getAllCategories().filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3);

      setSearchResults({ games, categories });
      setSelectedIndex(0);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 键盘导航
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleKeyDown = (e) => {
      const totalResults = searchResults.games.length + searchResults.categories.length;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(totalResults, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + Math.max(totalResults, 1)) % Math.max(totalResults, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSelectResult(selectedIndex);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, searchResults, selectedIndex]);

  // 点击外部关闭搜索
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectResult = (index) => {
    const totalGames = searchResults.games.length;
    
    if (index < totalGames) {
      const game = searchResults.games[index];
      router.push(`/games/${game.slug}`);
    } else {
      const category = searchResults.categories[index - totalGames];
      router.push(`/category/${category.slug}`);
    }
    
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const isActiveItem = (item) => {
    if (item.url === '/' && pathname === '/') return true;
    if (item.url !== '/' && pathname === item.url) return true;
    return false;
  };

  return (
    <nav className="top-navigation bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Logo / Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="text-xl flex items-center font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                <img src="/images/logo.png" alt="logo" className="w-9 h-9 mr-2" />
                {siteConfig.shortName}
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline">
              
              {/* Navigation Items */}
              {navigationConfig.topItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => handleNavigationClick(item)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveItem(item)
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.title}
                </Link>
              ))}

              {/* Search Box */}
              <div className="relative ml-5" ref={searchRef}>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    className="w-56 pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Search Results Dropdown */}
                {isSearchOpen && (searchQuery.trim() || searchResults.games.length > 0 || searchResults.categories.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    
                    {/* 搜索结果 */}
                    {searchQuery.trim() && (searchResults.games.length > 0 || searchResults.categories.length > 0) ? (
                      <>
                        {/* 游戏结果 */}
                        {searchResults.games.length > 0 && (
                          <div className="p-2">
                            <h3 className="text-xs font-medium text-gray-500 mb-2 px-2">🎮 Games</h3>
                            <div className="space-y-1">
                              {searchResults.games.map((game, index) => (
                                <button
                                  key={game.id}
                                  onClick={() => handleSelectResult(index)}
                                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                                    selectedIndex === index
                                      ? 'bg-blue-50 border border-blue-200'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                                      <span className="text-sm">🎮</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {highlightText(game.title, searchQuery)}
                                      </p>
                                      <p className="text-xs text-gray-500 truncate">
                                        {highlightText(game.description, searchQuery)}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 分类结果 */}
                        {searchResults.categories.length > 0 && (
                          <div className="p-2 border-t border-gray-100">
                            <h3 className="text-xs font-medium text-gray-500 mb-2 px-2">📂 Categories</h3>
                            <div className="space-y-1">
                              {searchResults.categories.map((category, index) => (
                                <button
                                  key={category.id}
                                  onClick={() => handleSelectResult(searchResults.games.length + index)}
                                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                                    selectedIndex === searchResults.games.length + index
                                      ? 'bg-blue-50 border border-blue-200'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                                      <span className="text-sm">📂</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {highlightText(category.name, searchQuery)}
                                      </p>
                                      <p className="text-xs text-gray-500 truncate">
                                        {highlightText(category.description, searchQuery)}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : searchQuery.trim() ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No results found for "{searchQuery}"
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        Type to search games and categories...
                      </div>
                    )}

                    {/* 快捷键提示 */}
                    <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
                      <div className="flex items-center justify-center space-x-3">
                        <span>↑↓ 选择</span>
                        <span>Enter 确认</span>
                        <span>Esc 关闭</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
              
              {/* Mobile Search */}
              <div className="mb-3 relative" ref={searchRef}>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Mobile Search Results Dropdown */}
                {isSearchOpen && (searchQuery.trim() || searchResults.games.length > 0 || searchResults.categories.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                    
                    {/* 搜索结果 */}
                    {searchQuery.trim() && (searchResults.games.length > 0 || searchResults.categories.length > 0) ? (
                      <>
                        {/* 游戏结果 */}
                        {searchResults.games.length > 0 && (
                          <div className="p-2">
                            <h3 className="text-xs font-medium text-gray-500 mb-2 px-2">🎮 Games</h3>
                            <div className="space-y-1">
                              {searchResults.games.map((game, index) => (
                                <button
                                  key={game.id}
                                  onClick={() => handleSelectResult(index)}
                                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                                    selectedIndex === index
                                      ? 'bg-blue-50 border border-blue-200'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                                      <span className="text-xs">🎮</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {highlightText(game.title, searchQuery)}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 分类结果 */}
                        {searchResults.categories.length > 0 && (
                          <div className="p-2 border-t border-gray-100">
                            <h3 className="text-xs font-medium text-gray-500 mb-2 px-2">📂 Categories</h3>
                            <div className="space-y-1">
                              {searchResults.categories.map((category, index) => (
                                <button
                                  key={category.id}
                                  onClick={() => handleSelectResult(searchResults.games.length + index)}
                                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                                    selectedIndex === searchResults.games.length + index
                                      ? 'bg-blue-50 border border-blue-200'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                                      <span className="text-xs">📂</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {highlightText(category.name, searchQuery)}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : searchQuery.trim() ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No results found for "{searchQuery}"
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        Type to search games and categories...
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Items */}
              {navigationConfig.topItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
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
                      {item.id === 'geometry-dash-lite' && '🎮'}
                      {item.id === 'tetris' && '🔷'}
                      {item.id === 'pac-man' && '👻'}
                    </span>
                  )}
                  {item.title}
                </Link>
              ))}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg className="flex-shrink-0 h-4 w-4 text-gray-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {item.url ? (
                <Link href={item.url} className="hover:text-gray-700 transition-colors">
                  {item.title}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.title}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

// Category Badge Component
export const CategoryBadge = ({ category, isActive = false, className = '' }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors";
  const activeClasses = isActive 
    ? "bg-blue-500 text-white" 
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";

  return (
    <span className={`${baseClasses} ${activeClasses} ${className}`}>
      {category.name}
    </span>
  );
};

export default Navigation;