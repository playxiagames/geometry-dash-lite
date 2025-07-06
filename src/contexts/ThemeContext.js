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

  // 获取当前DOM上的主题类（从初始化脚本设置的类中读取）
  const getCurrentDOMTheme = () => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      if (root.classList.contains('dark')) {
        return THEMES.DARK
      } else if (root.classList.contains('light')) {
        return THEMES.LIGHT
      }
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

  // 初始化主题 - 确保与初始化脚本同步
  useEffect(() => {
    // 设置系统主题
    const currentSystemTheme = getSystemTheme()
    setSystemTheme(currentSystemTheme)
    
    // 加载保存的主题
    const savedTheme = loadTheme()
    
    // 检查当前DOM状态，确保与初始化脚本设置的状态一致
    const currentDOMTheme = getCurrentDOMTheme()
    
    // 如果保存的主题是system，需要确保状态与实际DOM一致
    if (savedTheme === THEMES.SYSTEM) {
      // 检查DOM状态是否与当前系统主题匹配
      const expectedDOMTheme = currentSystemTheme
      if (currentDOMTheme !== expectedDOMTheme) {
        // 如果不匹配，应用正确的主题
        applyTheme(expectedDOMTheme)
      }
    }
    
    setTheme(savedTheme)
    setMounted(true)
  }, [])

  // 监听系统主题变化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleSystemThemeChange = (e) => {
        const newSystemTheme = e.matches ? THEMES.DARK : THEMES.LIGHT
        setSystemTheme(newSystemTheme)
        
        // 如果当前使用系统主题，立即应用新的系统主题
        if (theme === THEMES.SYSTEM) {
          applyTheme(newSystemTheme)
        }
      }

      // 添加监听器
      mediaQuery.addEventListener('change', handleSystemThemeChange)
      
      // 清理函数
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
      }
    }
  }, [theme])

  // 应用主题到DOM - 只在主题真正变化时执行
  useEffect(() => {
    if (mounted) {
      // 检查当前DOM状态
      const currentDOMTheme = getCurrentDOMTheme()
      
      // 只有当需要应用的主题与当前DOM主题不同时才更新
      if (currentDOMTheme !== resolvedTheme) {
        applyTheme(resolvedTheme)
      }
    }
  }, [resolvedTheme, mounted])

  // 防止服务端渲染不匹配 - 初始渲染时使用当前DOM状态
  if (!mounted) {
    // 在客户端，尝试从DOM读取当前主题状态
    const initialResolvedTheme = typeof window !== 'undefined' 
      ? getCurrentDOMTheme() 
      : THEMES.LIGHT

    return (
      <ThemeContext.Provider 
        value={{
          theme: defaultTheme,
          setTheme: () => {},
          resolvedTheme: initialResolvedTheme,
          systemTheme: typeof window !== 'undefined' ? getSystemTheme() : THEMES.LIGHT
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