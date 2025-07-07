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

    // 加载 Google Analytics
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)

    // 初始化 gtag
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', gaId, {
      anonymize_ip: true
    })

    console.log('✅ Google Analytics initialized:', gaId)

  }, [])

  return null
} 