'use client'

import { useContext, useCallback } from 'react'
import ThemeContext, { THEMES } from '../contexts/ThemeContext'

/**
 * 主题操作Hook
 * 提供便利的主题操作方法（只支持明暗两种主题）
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  const { theme, setTheme, resolvedTheme } = context

  // 在明暗主题间切换
  const toggleTheme = useCallback(() => {
    setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)
  }, [theme, setTheme])

  // 简单的明暗切换（保持兼容性）
  const toggleLightDark = useCallback(() => {
    setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)
  }, [theme, setTheme])

  // 设置为亮色主题
  const setLightTheme = useCallback(() => {
    setTheme(THEMES.LIGHT)
  }, [setTheme])

  // 设置为暗色主题
  const setDarkTheme = useCallback(() => {
    setTheme(THEMES.DARK)
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

  // 获取主题图标 - 显示切换目标
  const getThemeIcon = useCallback(() => {
    // 根据当前主题显示切换目标图标
    return theme === THEMES.DARK ? '☀️' : '🌙'
  }, [theme])

  // 获取简化切换器的图标 - 专门用于SimpleThemeToggle
  const getToggleIcon = useCallback(() => {
    // 根据当前实际应用的主题显示切换目标
    return resolvedTheme === THEMES.DARK ? '☀️' : '🌙'
  }, [resolvedTheme])

  // 获取主题名称
  const getThemeName = useCallback((targetTheme = theme) => {
    switch (targetTheme) {
      case THEMES.LIGHT:
        return 'Light'
      case THEMES.DARK:
        return 'Dark'
      default:
        return 'Dark'
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
    isDark,
    isLight,
    
    // 基础操作
    setTheme,
    
    // 便利操作
    toggleTheme,
    toggleLightDark,
    setLightTheme,
    setDarkTheme,
    
    // 检查方法
    isTheme,
    isResolvedTheme,
    
    // 工具方法
    getThemeIcon,
    getToggleIcon,
    getThemeName,
    getThemeClass,
    
    // 常量
    THEMES
  }
}

export default useTheme 