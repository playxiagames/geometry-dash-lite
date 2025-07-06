'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// 主题类型
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}

// 创建主题上下文
const ThemeContext = createContext({
  theme: THEMES.LIGHT,
  setTheme: () => {},
  resolvedTheme: THEMES.LIGHT, // 实际应用的主题（解析后的）
  systemTheme: THEMES.LIGHT    // 系统主题
})

// 主题提供者组件
export function ThemeProvider({ children, defaultTheme = THEMES.SYSTEM }) {
  const [theme, setTheme] = useState(defaultTheme)
  const [systemTheme, setSystemTheme] = useState(THEMES.LIGHT)
  const [mounted, setMounted] = useState(false)

  // 获取实际应用的主题
  const resolvedTheme = theme === THEMES.SYSTEM ? systemTheme : theme

  // 检测系统主题
  const getSystemTheme = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? THEMES.DARK 
        : THEMES.LIGHT
    }
    return THEMES.LIGHT
  }

  // 应用主题到DOM
  const applyTheme = (newTheme) => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      
      // 移除之前的主题类
      root.classList.remove('light', 'dark')
      
      // 添加新主题类
      if (newTheme === THEMES.DARK) {
        root.classList.add('dark')
      } else {
        root.classList.add('light')
      }

      // 设置meta标签（用于状态栏样式）
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content', 
          newTheme === THEMES.DARK ? '#0f172a' : '#ffffff'
        )
      }
    }
  }

  // 保存主题到localStorage
  const saveTheme = (newTheme) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme)
      } catch (error) {
        console.warn('Failed to save theme preference:', error)
      }
    }
  }

  // 从localStorage加载主题
  const loadTheme = () => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
          return savedTheme
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error)
      }
    }
    return defaultTheme
  }

  // 切换主题
  const changeTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme)
      saveTheme(newTheme)
    }
  }

  // 初始化主题
  useEffect(() => {
    // 设置系统主题
    setSystemTheme(getSystemTheme())
    
    // 加载保存的主题
    const savedTheme = loadTheme()
    setTheme(savedTheme)
    
    setMounted(true)
  }, [])

  // 监听系统主题变化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleSystemThemeChange = (e) => {
        setSystemTheme(e.matches ? THEMES.DARK : THEMES.LIGHT)
      }

      // 添加监听器
      mediaQuery.addEventListener('change', handleSystemThemeChange)
      
      // 清理函数
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
      }
    }
  }, [])

  // 应用主题到DOM
  useEffect(() => {
    if (mounted) {
      applyTheme(resolvedTheme)
    }
  }, [resolvedTheme, mounted])

  // 防止服务端渲染不匹配
  if (!mounted) {
    return (
      <ThemeContext.Provider 
        value={{
          theme: defaultTheme,
          setTheme: () => {},
          resolvedTheme: THEMES.LIGHT,
          systemTheme: THEMES.LIGHT
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider 
      value={{
        theme,
        setTheme: changeTheme,
        resolvedTheme,
        systemTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// 使用主题的Hook
export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

export default ThemeContext 