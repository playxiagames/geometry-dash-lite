'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// 主题类型
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
}

// 创建主题上下文
const ThemeContext = createContext({
  theme: THEMES.DARK,
  setTheme: () => {}
})

// 主题提供者组件
export function ThemeProvider({ children, defaultTheme = THEMES.DARK }) {
  const [theme, setTheme] = useState(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // 应用主题到DOM
  const applyTheme = (newTheme) => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(newTheme)
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
      applyTheme(newTheme)
    }
  }

  // 初始化主题
  useEffect(() => {
    const savedTheme = loadTheme()
    setTheme(savedTheme)
    applyTheme(savedTheme)
    setMounted(true)
  }, [])

  // 防止服务端渲染不匹配
  if (!mounted) {
    return (
      <ThemeContext.Provider 
        value={{
          theme: defaultTheme,
          setTheme: () => {}
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
        setTheme: changeTheme
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