'use client';

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // 预加载关键游戏页面
    const preloadCriticalPages = () => {
      const criticalPages = [
        '/games/geometry-dash-lite/',
        '/games/dinosaur-game/',
        '/games/subway-surfers/',
        '/category/geometry-dash/',
        '/category/google-games/'
      ];

      criticalPages.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });
    };

    // 基于用户交互的智能预加载
    const setupInteractivePreload = () => {
      const gameCards = document.querySelectorAll('[data-game-slug]');
      
      gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          const gameSlug = card.getAttribute('data-game-slug');
          if (gameSlug) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = `/games/${gameSlug}/`;
            document.head.appendChild(link);
          }
        }, { once: true });
      });
    };

    // 初始化优化
    const initOptimizations = () => {
      preloadCriticalPages();
      setupInteractivePreload();
    };

    // 等待DOM加载后初始化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initOptimizations);
    } else {
      initOptimizations();
    }
  }, []);

  return null; // 这个组件不渲染任何UI
}

// 简化的性能监控工具
export const PerformanceMonitor = {
  // 测量游戏加载时间
  measureGameLoad: (gameSlug) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      // 只有在配置了GA的情况下才追踪
      if (typeof window.trackCustomEvent === 'function') {
        window.trackCustomEvent('game_load_time', {
          event_category: 'Game Performance',
          event_label: gameSlug,
          value: Math.round(loadTime)
        });
      }
    };
  }
}; 