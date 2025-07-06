'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'

/**
 * 主题切换按钮组件
 * 支持点击切换和下拉菜单选择
 */
export function ThemeToggle({ 
  variant = 'button', // 'button' | 'dropdown'
  size = 'medium',    // 'small' | 'medium' | 'large'
  showLabel = false,
  className = ''
}) {
  const { 
    theme, 
    toggleTheme, 
    setTheme,
    getThemeIcon, 
    getThemeName,
    THEMES 
  } = useTheme()
  
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 防止SSR不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  // 尺寸样式
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base', 
    large: 'w-12 h-12 text-lg'
  }

  // 基础按钮样式
  const buttonBaseClasses = `
    relative inline-flex items-center justify-center
    rounded-lg border transition-all duration-200
    bg-white dark:bg-slate-800
    border-gray-200 dark:border-slate-600
    text-gray-700 dark:text-gray-300
    hover:bg-gray-50 dark:hover:bg-slate-700
    hover:border-gray-300 dark:hover:border-slate-500
    focus:outline-none focus:ring-2 focus:ring-primary-500/20
    active:scale-95
    ${sizeClasses[size]}
    ${className}
  `

  // 主题选项
  const themeOptions = [
    { 
      value: THEMES.LIGHT, 
      icon: '☀️', 
      label: 'Light',
      description: 'Light theme'
    },
    { 
      value: THEMES.DARK, 
      icon: '🌙', 
      label: 'Dark',
      description: 'Dark theme'
    },
    { 
      value: THEMES.SYSTEM, 
      icon: '🖥️', 
      label: 'System',
      description: 'Follow system'
    }
  ]

  // 处理键盘事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (variant === 'dropdown') {
        setIsOpen(!isOpen)
      } else {
        toggleTheme()
      }
    } else if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
    }
  }

  // 处理主题选择
  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme)
    setIsOpen(false)
  }

  // 处理点击外部关闭
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event) => {
      if (!event.target.closest('[data-theme-toggle]')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  if (!mounted) {
    return (
      <div className={`${buttonBaseClasses} animate-pulse`}>
        <span className="text-gray-400">⚪</span>
      </div>
    )
  }

  if (variant === 'dropdown') {
    return (
      <div className="relative" data-theme-toggle>
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={buttonBaseClasses}
          aria-label="Toggle theme menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="animate-theme-transition">
            {getThemeIcon()}
          </span>
          {showLabel && (
            <span className="ml-2 hidden sm:inline">
              {getThemeName()}
            </span>
          )}
          {/* 下拉箭头 */}
          <svg 
            className={`ml-1 w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* 下拉菜单 */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-50">
            <div className="py-1">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleThemeSelect(option.value)}
                  className={`
                    w-full px-4 py-2 text-left text-sm
                    flex items-center space-x-3
                    hover:bg-gray-50 dark:hover:bg-slate-700
                    transition-colors duration-150
                    ${theme === option.value 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                      : 'text-gray-700 dark:text-gray-300'
                    }
                  `}
                  aria-label={`Switch to ${option.description}`}
                >
                  <span className="text-lg">{option.icon}</span>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs opacity-60">{option.description}</div>
                  </div>
                  {theme === option.value && (
                    <span className="ml-auto text-primary-500">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // 简单按钮模式
  return (
    <button
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className={buttonBaseClasses}
      aria-label={`Switch to ${getThemeName()} theme`}
      title={`Current: ${getThemeName()} theme. Click to cycle through themes.`}
    >
      <span className="animate-theme-transition">
        {getThemeIcon()}
      </span>
      {showLabel && (
        <span className="ml-2 hidden sm:inline">
          {getThemeName()}
        </span>
      )}
    </button>
  )
}

/**
 * 简化的主题切换按钮（仅在明暗主题间切换）
 */
export function SimpleThemeToggle({ size = 'medium', className = '' }) {
  const { isDark, toggleLightDark } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg'
  }

  const buttonClasses = `
    relative inline-flex items-center justify-center
    rounded-lg border transition-all duration-200
    bg-white dark:bg-slate-800
    border-gray-200 dark:border-slate-600
    text-gray-700 dark:text-gray-300
    hover:bg-gray-50 dark:hover:bg-slate-700
    hover:border-gray-300 dark:hover:border-slate-500
    focus:outline-none focus:ring-2 focus:ring-primary-500/20
    active:scale-95
    ${sizeClasses[size]}
    ${className}
  `

  if (!mounted) {
    return <div className={`${buttonClasses} animate-pulse`} />
  }

  return (
    <button
      onClick={toggleLightDark}
      className={buttonClasses}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className="animate-theme-transition">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}

export default ThemeToggle 