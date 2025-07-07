'use client';

// 简化的性能优化组件 - 移除复杂的客户端预加载逻辑
// Next.js 内置的预加载机制已经足够高效
export default function PerformanceOptimizer() {
  // 移除复杂的useEffect逻辑，让Next.js处理预加载
  return null;
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