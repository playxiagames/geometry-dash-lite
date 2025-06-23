'use client'

import { useEffect } from 'react'
import { getSEOConfig } from '../utils/gameData'

export default function GoogleAnalytics() {
  useEffect(() => {
    // 只在生产环境执行
    if (process.env.NODE_ENV !== 'production') return

    const seoConfig = getSEOConfig()
    const gaId = seoConfig?.googleAnalyticsId

    if (!gaId) return

    // 动态加载 Google Analytics
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script1)

    // 初始化 gtag
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', gaId, {
      // 基本配置
      page_title: document.title,
      page_location: window.location.href,
      // 增强电子商务配置（可选）
      custom_map: {
        'custom_parameter': 'game_category'
      },
      // 用户隐私配置
      anonymize_ip: true,
      // 页面浏览配置
      send_page_view: true
    })

    // 游戏相关事件追踪函数
    window.trackGameEvent = (action, gameName, category = 'Game') => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', action, {
          event_category: category,
          event_label: gameName,
          value: 1
        })
      }
    }

    // 自定义事件追踪函数
    window.trackCustomEvent = (eventName, parameters = {}) => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, parameters)
      }
    }

    console.log('✅ Google Analytics initialized:', gaId)

    // 清理函数
    return () => {
      // 移除添加的脚本
      const scripts = document.querySelectorAll(`script[src*="googletagmanager.com"]`)
      scripts.forEach(script => script.remove())
    }
  }, [])

  return null
} 