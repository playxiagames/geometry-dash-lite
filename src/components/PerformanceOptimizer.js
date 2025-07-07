'use client';

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // 预加载关键游戏数据
    const preloadCriticalGames = () => {
      const criticalGames = [
        '/games/geometry-dash-lite/',
        '/games/dinosaur-game/',
        '/games/subway-surfers/',
        '/category/geometry-dash/',
        '/category/google-games/'
      ];

      criticalGames.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });
    };

    // 智能图片预加载 - 基于用户交互
    const preloadGameImages = () => {
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

    // 延迟加载非关键资源
    const deferNonCriticalResources = () => {
      // 延迟加载社交媒体脚本等非关键资源
      setTimeout(() => {
        // 这里可以添加延迟加载的脚本
      }, 3000);
    };

    // 优化页面滚动性能
    const optimizeScrollPerformance = () => {
      let ticking = false;
      
      function updateOnScroll() {
        // 在这里可以添加滚动优化逻辑
        ticking = false;
      }

      function requestTick() {
        if (!ticking) {
          requestAnimationFrame(updateOnScroll);
          ticking = true;
        }
      }

      window.addEventListener('scroll', requestTick, { passive: true });

      return () => {
        window.removeEventListener('scroll', requestTick);
      };
    };

    // 内存管理 - 清理未使用的资源
    const memoryManagement = () => {
      const cleanup = () => {
        // 清理DOM中的临时元素
        const tempElements = document.querySelectorAll('[data-temp]');
        tempElements.forEach(el => el.remove());
        
        // 强制垃圾回收（在支持的浏览器中）
        if (window.gc) {
          window.gc();
        }
      };

      // 每5分钟清理一次
      const cleanupInterval = setInterval(cleanup, 5 * 60 * 1000);

      return () => clearInterval(cleanupInterval);
    };

    // 网络状态感知优化
    const networkAwareOptimization = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection;
        
        // 根据网络状况调整资源加载策略
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          // 低速网络：减少预加载
          document.documentElement.classList.add('slow-network');
        } else if (connection.effectiveType === '4g') {
          // 高速网络：可以更积极地预加载
          preloadCriticalGames();
        }

        // 监听网络状态变化
        connection.addEventListener('change', () => {
          if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.documentElement.classList.add('slow-network');
          } else {
            document.documentElement.classList.remove('slow-network');
          }
        });
      }
    };

    // Service Worker 注册（用于缓存策略）
    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
              console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    };

    // 初始化所有优化
    const initOptimizations = () => {
      preloadCriticalGames();
      preloadGameImages();
      deferNonCriticalResources();
      networkAwareOptimization();
      registerServiceWorker();
      
      const cleanupScroll = optimizeScrollPerformance();
      const cleanupMemory = memoryManagement();

      return () => {
        cleanupScroll && cleanupScroll();
        cleanupMemory && cleanupMemory();
      };
    };

    // 等待DOM完全加载后初始化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initOptimizations);
    } else {
      return initOptimizations();
    }
  }, []);

  return null; // 这个组件不渲染任何UI
}

// 性能监控工具
export const PerformanceMonitor = {
  // 测量页面加载性能
  measurePageLoad: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        if (perfData) {
          const metrics = {
            dns: perfData.domainLookupEnd - perfData.domainLookupStart,
            connection: perfData.connectEnd - perfData.connectStart,
            request: perfData.responseStart - perfData.requestStart,
            response: perfData.responseEnd - perfData.responseStart,
            dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            load: perfData.loadEventEnd - perfData.loadEventStart,
            total: perfData.loadEventEnd - perfData.navigationStart
          };

          // 发送性能数据到分析工具（如果配置了）
          if (window.trackCustomEvent) {
            window.trackCustomEvent('page_performance', {
              event_category: 'Performance',
              dns_time: Math.round(metrics.dns),
              connection_time: Math.round(metrics.connection),
              total_load_time: Math.round(metrics.total)
            });
          }
        }
      });
    }
  },

  // 测量游戏加载时间
  measureGameLoad: (gameSlug) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      if (window.trackCustomEvent) {
        window.trackCustomEvent('game_load_time', {
          event_category: 'Game Performance',
          event_label: gameSlug,
          value: Math.round(loadTime)
        });
      }
    };
  }
}; 