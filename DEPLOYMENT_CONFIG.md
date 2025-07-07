# 部署配置指南

由于项目使用 `output: 'export'` 进行静态导出，一些性能优化需要在服务器或CDN级别配置。

## 🚀 必需的缓存头配置

### 对于 GitHub Pages + Cloudflare
在 Cloudflare 中设置页面规则：

#### 静态资源缓存
```
匹配: *.geometry-dash-lite.org/images/*
缓存级别: 缓存所有内容
边缘缓存TTL: 1年
浏览器缓存TTL: 1年
```

```
匹配: *.geometry-dash-lite.org/_next/static/*
缓存级别: 缓存所有内容
边缘缓存TTL: 1年
浏览器缓存TTL: 1年
```

#### HTML页面缓存
```
匹配: *.geometry-dash-lite.org/*
缓存级别: 标准
边缘缓存TTL: 1天
浏览器缓存TTL: 1小时
```

### 对于 Vercel 部署
在 `vercel.json` 中添加：

```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control", 
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-DNS-Prefetch-Control",
          "value": "on"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/games/",
      "destination": "/all-games/",
      "permanent": true
    },
    {
      "source": "/categories/",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### 对于 Netlify 部署
在 `public/_headers` 文件中添加：

```
# 静态资源缓存
/images/*
  Cache-Control: public, max-age=31536000, immutable

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

# 安全头
/*
  X-DNS-Prefetch-Control: on
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: origin-when-cross-origin
```

在 `public/_redirects` 文件中添加：

```
/games/ /all-games/ 301!
/categories/ / 301!
```

## 🔍 SEO验证清单

### 1. 检查结构化数据
使用 Google 的结构化数据测试工具：
- 访问：https://search.google.com/test/rich-results
- 测试游戏页面：`https://geometry-dash-lite.org/games/geometry-dash-lite/`
- 验证Game schema是否正确

### 2. 验证sitemap
- 检查：`https://geometry-dash-lite.org/sitemap.xml`
- 确保所有68个游戏页面都包含在内
- 验证priority和lastModified设置

### 3. 性能测试
使用以下工具测试：
- PageSpeed Insights
- GTmetrix  
- WebPageTest

### 4. 移动友好性测试
- Google Mobile-Friendly Test
- 确保响应式设计正常工作

## 🎯 预期性能指标

优化后应达到的目标：
- **Lighthouse Performance**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 📊 监控和分析

### Google Analytics 事件
已配置的自定义事件：
- `game_play` - 游戏开始播放
- `page_performance` - 页面性能指标
- `game_load_time` - 游戏加载时间

### Search Console
在 Google Search Console 中监控：
- 索引覆盖率
- 富媒体搜索结果
- 页面体验信号
- 移动设备可用性

## 🚨 常见问题

### Q: 为什么移除了 Next.js 的 headers 配置？
A: 静态导出 (`output: 'export'`) 不支持服务器端功能。需要在CDN/服务器级别设置。

### Q: 如何验证缓存是否工作？
A: 使用浏览器开发者工具的 Network 标签，检查响应头中的 `Cache-Control`。

### Q: 图片懒加载是否影响SEO？
A: 不会。我们的实现使用 Intersection Observer，对SEO友好。

### Q: 结构化数据多久生效？
A: Google 通常在几天到几周内开始显示富媒体搜索结果。 