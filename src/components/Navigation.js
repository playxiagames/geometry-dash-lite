'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getSiteConfig, getNavigationConfig } from '../utils/gameData';
import { SimpleThemeToggle } from './ThemeToggle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const isActiveItem = (item) => {
    if (item.url === '/' && pathname === '/') return true;
    if (item.url !== '/' && pathname === item.url) return true;
    return false;
  };

  return (
    <nav className="top-navigation bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Logo / Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="text-xl flex items-center font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.title}
                </Link>
              ))}

              {/* Theme Toggle */}
              <div className="flex items-center ml-5 space-x-3">
                {/* Desktop Theme Toggle */}
                <SimpleThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile menu button & theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <SimpleThemeToggle />
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
              


              {/* Navigation Items */}
              {navigationConfig.topItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => handleNavigationClick(item)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActiveItem(item)
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
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
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg className="flex-shrink-0 h-4 w-4 text-gray-300 dark:text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {item.href ? (
                <Link href={item.href} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
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
    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600";

  return (
    <Link 
      href={`/category/${category.slug}/`}
      className={`${baseClasses} ${activeClasses} ${className}`}
    >
      {category.name}
    </Link>
  );
};

export default Navigation;