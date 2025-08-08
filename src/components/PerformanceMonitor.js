/**
 * 性能监控和优化组件
 */

'use client';

import { useEffect, useMemo, useState, useRef } from 'react';

export function WebVitalsTracker() {
  useEffect(() => {
    // 只在生产环境和支持Performance API的浏览器中运行
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined' || !window.performance) {
      return;
    }

    // 监控Core Web Vitals
    function trackWebVital(metric) {
      // 发送到Google Analytics（如果可用）
      if (typeof window.gtag === 'function') {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // 控制台日志（开发时查看）
      console.log(`${metric.name}: ${metric.value}`, metric);
    }

    // 动态导入web-vitals库并监控指标
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(trackWebVital);
      getFID(trackWebVital);
      getFCP(trackWebVital);
      getLCP(trackWebVital);
      getTTFB(trackWebVital);
    }).catch(() => {
      // web-vitals库加载失败时的降级处理
      console.log('Web Vitals monitoring unavailable');
    });

    // 监控自定义性能指标
    function trackCustomMetrics() {
      if (!window.performance || !window.performance.timing) return;

      const timing = window.performance.timing;
      const navigation = window.performance.navigation;

      // 计算关键时间指标
      const metrics = {
        // DNS解析时间
        dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
        // TCP连接时间
        tcpTime: timing.connectEnd - timing.connectStart,
        // 请求响应时间
        requestTime: timing.responseEnd - timing.requestStart,
        // DOM解析时间
        domParseTime: timing.domContentLoadedEventEnd - timing.domLoading,
        // 页面加载完成时间
        loadTime: timing.loadEventEnd - timing.navigationStart,
        // 首字节时间
        ttfb: timing.responseStart - timing.navigationStart
      };

      // 发送自定义指标到GA
      if (typeof window.gtag === 'function') {
        Object.entries(metrics).forEach(([name, value]) => {
          if (value > 0) {
            window.gtag('event', 'timing_complete', {
              event_category: 'Performance',
              name: name,
              value: Math.round(value)
            });
          }
        });
      }
    }

    // 页面加载完成后追踪自定义指标
    if (document.readyState === 'complete') {
      trackCustomMetrics();
    } else {
      window.addEventListener('load', trackCustomMetrics);
    }

    // 监控资源加载性能
    function trackResourcePerformance() {
      if (!window.performance || !window.performance.getEntriesByType) return;

      const resources = window.performance.getEntriesByType('resource');
      const slowResources = resources.filter(resource => resource.duration > 1000);

      if (slowResources.length > 0 && typeof window.gtag === 'function') {
        slowResources.forEach(resource => {
          window.gtag('event', 'slow_resource', {
            event_category: 'Performance',
            event_label: resource.name,
            value: Math.round(resource.duration)
          });
        });
      }
    }

    // 延迟执行资源性能监控
    setTimeout(trackResourcePerformance, 2000);

  }, []);

  return null; // 这个组件不渲染任何内容
}

export function ImageOptimizer({ src, alt, className, width, height, priority = false, ...props }) {
  const optimizedSrc = useMemo(() => {
    if (!src || src.startsWith('data:')) return src;
    
    // 如果是外部图片，返回原始src
    if (src.startsWith('http') && !src.includes('geometry-dash-lite.org')) {
      return src;
    }
    
    // 对于内部图片，可以添加优化参数
    return src;
  }, [src]);

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
}

export function PreloadCriticalResources({ gameSlug, preloadImages = [] }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 预加载关键游戏资源
    if (gameSlug) {
      const gameUrl = `/games/${gameSlug}/`;
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = gameUrl;
      document.head.appendChild(link);
    }

    // 预加载关键图片
    preloadImages.forEach(imageSrc => {
      if (imageSrc) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = imageSrc;
        document.head.appendChild(link);
      }
    });

    // 预连接到游戏域名
    const gameOrigins = ['https://1games.io', 'https://scratch.mit.edu'];
    gameOrigins.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      if (!document.querySelector(`link[href="${origin}"]`)) {
        document.head.appendChild(link);
      }
    });

  }, [gameSlug, preloadImages]);

  return null;
}

export function LazyLoadObserver({ children, className, fallback, rootMargin = '50px' }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}

// 自定义Hook：监控游戏加载性能
export function useGameLoadingTracker(gameName) {
  useEffect(() => {
    if (!gameName || typeof window === 'undefined') return;

    const startTime = performance.now();

    // 监控游戏iframe加载
    const iframe = document.querySelector('iframe[title*="' + gameName + '"]');
    if (iframe) {
      const loadHandler = () => {
        const loadTime = performance.now() - startTime;
        
        // 追踪到GA
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'game_load_time', {
            event_category: 'Game Performance',
            event_label: gameName,
            value: Math.round(loadTime)
          });
        }

        // 追踪游戏开始事件
        if (typeof window.trackGameStart === 'function') {
          window.trackGameStart(gameName);
        }
      };

      iframe.addEventListener('load', loadHandler, { once: true });
      
      return () => {
        iframe.removeEventListener('load', loadHandler);
      };
    }
  }, [gameName]);
}

export default {
  WebVitalsTracker,
  ImageOptimizer, 
  PreloadCriticalResources,
  LazyLoadObserver,
  useGameLoadingTracker
};