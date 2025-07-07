'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { THEME_TOGGLE_SIZES } from '../constants/styles'

/**
 * 简化的主题切换按钮（只支持明暗两种主题切换）
 */
export function SimpleThemeToggle({ size = 'medium', className = '' }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 切换主题
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // 获取主题图标
  const getThemeIcon = () => {
    return theme === 'dark' ? '☀️' : '🌙'
  }

  // 获取主题名称
  const getThemeName = () => {
    return theme === 'dark' ? 'Dark' : 'Light'
  }

  // 获取下一个主题名称用于提示
  const getNextThemeName = () => {
    return theme === 'dark' ? 'Light' : 'Dark'
  }

  const sizeClass = THEME_TOGGLE_SIZES[size] || THEME_TOGGLE_SIZES.medium;

  const buttonClasses = `
    relative inline-flex items-center justify-center
    rounded-lg border transition-all duration-200
    bg-white dark:bg-slate-800
    border-gray-200 dark:border-slate-600
    text-gray-700 dark:text-gray-300
    hover:bg-gray-50 dark:hover:bg-slate-700
    hover:border-gray-300 dark:hover:border-slate-500
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    active:scale-95
    ${sizeClass}
    ${className}
  `

  if (!mounted) {
    return (
      <button
        className={buttonClasses}
        disabled
        aria-label="Loading theme toggle"
      >
        <span className="animate-pulse">⚪</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label={`Switch to ${getNextThemeName().toLowerCase()} theme`}
      title={`Current: ${getThemeName()} theme. Click to switch to ${getNextThemeName()}.`}
    >
      <span className="transition-all duration-200">
        {getThemeIcon()}
      </span>
    </button>
  )
}

export default SimpleThemeToggle 