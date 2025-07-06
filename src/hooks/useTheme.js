'use client'

import { useContext, useCallback } from 'react'
import ThemeContext, { THEMES } from '../contexts/ThemeContext'

/**
 * 主题操作Hook
 * 提供便利的主题操作方法
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  const { theme, setTheme, resolvedTheme, systemTheme } = context

  // 切换到下一个主题（循环切换）
  const toggleTheme = useCallback(() => {
    const themeOrder = [THEMES.LIGHT, THEMES.DARK, THEMES.SYSTEM]
    const currentIndex = themeOrder.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themeOrder.length
    setTheme(themeOrder[nextIndex])
  }, [theme, setTheme])

  // 简单的明暗切换（不包含系统主题）
  const toggleLightDark = useCallback(() => {
    if (theme === THEMES.SYSTEM) {
      // 如果当前是系统主题，根据当前系统主题切换到相反主题
      setTheme(systemTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)
    } else {
      // 在明暗主题间直接切换
      setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)
    }
  }, [theme, systemTheme, setTheme])

  // 设置为亮色主题
  const setLightTheme = useCallback(() => {
    setTheme(THEMES.LIGHT)
  }, [setTheme])

  // 设置为暗色主题
  const setDarkTheme = useCallback(() => {
    setTheme(THEMES.DARK)
  }, [setTheme])

  // 设置为系统主题
  const setSystemTheme = useCallback(() => {
    setTheme(THEMES.SYSTEM)
  }, [setTheme])

  // 检查是否为指定主题
  const isTheme = useCallback((targetTheme) => {
    return theme === targetTheme
  }, [theme])

  // 检查实际应用的主题
  const isResolvedTheme = useCallback((targetTheme) => {
    return resolvedTheme === targetTheme
  }, [resolvedTheme])

  // 判断是否为暗色主题
  const isDark = resolvedTheme === THEMES.DARK
  
  // 判断是否为亮色主题
  const isLight = resolvedTheme === THEMES.LIGHT

  // 判断是否为系统主题设置
  const isSystemMode = theme === THEMES.SYSTEM

  // 获取主题图标
  const getThemeIcon = useCallback((targetTheme = theme) => {
    switch (targetTheme) {
      case THEMES.LIGHT:
        return '☀️'
      case THEMES.DARK:
        return '🌙'
      case THEMES.SYSTEM:
        return '🖥️'
      default:
        return '☀️'
    }
  }, [theme])

  // 获取主题名称
  const getThemeName = useCallback((targetTheme = theme) => {
    switch (targetTheme) {
      case THEMES.LIGHT:
        return 'Light'
      case THEMES.DARK:
        return 'Dark'
      case THEMES.SYSTEM:
        return 'System'
      default:
        return 'Light'
    }
  }, [theme])

  // 获取当前主题的CSS类名
  const getThemeClass = useCallback(() => {
    return resolvedTheme === THEMES.DARK ? 'dark' : 'light'
  }, [resolvedTheme])

  return {
    // 基础状态
    theme,
    resolvedTheme,
    systemTheme,
    isDark,
    isLight,
    isSystemMode,
    
    // 基础操作
    setTheme,
    
    // 便利操作
    toggleTheme,
    toggleLightDark,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    
    // 检查方法
    isTheme,
    isResolvedTheme,
    
    // 工具方法
    getThemeIcon,
    getThemeName,
    getThemeClass,
    
    // 常量
    THEMES
  }
}

export default useTheme 