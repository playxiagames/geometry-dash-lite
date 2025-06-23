# 📊 Google Analytics 配置指南

## 🎯 概述

你的网站已成功集成Google Analytics 4 (GA4)，可以追踪用户行为和游戏互动数据。

**当前配置：**
- Google Analytics ID: `G-F1S6GMESB8`
- 配置文件：`src/data/siteConfig.json`
- 实现方式：服务端渲染 + 客户端增强

## 🔧 技术实现

### 1. 配置文件
```json
// src/data/siteConfig.json
{
  "seo": {
    "googleAnalyticsId": "G-F1S6GMESB8"
  }
}
```

### 2. 核心组件
- **Layout.js**: 在`<head>`中加载GA脚本
- **GoogleAnalytics.js**: 客户端增强追踪组件
- **游戏组件**: 集成事件追踪

### 3. 脚本加载
```javascript
// 仅在生产环境加载
{gaId && process.env.NODE_ENV === 'production' && (
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
)}
```

## 📈 追踪的事件类型

### 游戏相关事件

| 事件名称 | 触发时机 | 分类 | 说明 |
|---------|---------|------|------|
| `game_page_view` | 访问游戏页面 | Navigation | 用户查看特定游戏 |
| `game_loaded` | 游戏成功加载 | Gameplay | 游戏iframe加载完成 |
| `game_card_click` | 点击游戏卡片 | Navigation | 从首页/分类页点击游戏 |
| `sidebar_game_click` | 点击侧边栏游戏 | Navigation | 从推荐游戏列表点击 |

### 用户交互事件

| 事件名称 | 触发时机 | 分类 | 说明 |
|---------|---------|------|------|
| `fullscreen_enter` | 进入全屏模式 | User Interaction | 用户点击全屏按钮 |
| `fullscreen_exit` | 退出全屏模式 | User Interaction | 用户退出全屏 |
| `game_shared` | 分享游戏成功 | Social | 使用原生分享API |
| `game_link_copied` | 复制游戏链接 | Social | 复制链接到剪贴板 |

## 🛠️ 自定义事件追踪

### 使用内置函数
```javascript
// 游戏相关事件
window.trackGameEvent(action, gameName, category)

// 示例
window.trackGameEvent('level_completed', 'Geometry Dash Lite', 'Gameplay')
window.trackGameEvent('high_score', 'Pac-Man', 'Achievement')
```

### 通用自定义事件
```javascript
// 自定义事件
window.trackCustomEvent(eventName, parameters)

// 示例
window.trackCustomEvent('user_signup', {
  method: 'email',
  campaign: 'homepage_banner'
})

window.trackCustomEvent('search_performed', {
  search_term: 'puzzle games',
  results_count: 15
})
```

### 直接使用gtag
```javascript
// 直接调用gtag（高级用法）
if (typeof window.gtag === 'function') {
  window.gtag('event', 'custom_event', {
    event_category: 'Custom',
    event_label: 'Special Action',
    value: 1
  })
}
```

## 📊 Google Analytics 4 设置

### 1. 基本配置
```javascript
gtag('config', 'G-F1S6GMESB8', {
  // 页面追踪
  page_title: document.title,
  page_location: window.location.href,
  
  // 隐私设置
  anonymize_ip: true,
  
  // 页面浏览
  send_page_view: true
})
```

### 2. 推荐的GA4设置

**在Google Analytics界面中配置：**

**增强型电子商务（可选）:**
- 启用增强型电子商务
- 配置自定义维度

**转化目标:**
- 游戏加载完成
- 用户停留时间 > 2分钟
- 分享游戏

**受众群体:**
- 活跃游戏玩家
- 高互动用户
- 移动设备用户

## 🔍 重要指标监控

### 1. 游戏性能指标
- 最受欢迎游戏（按页面浏览量）
- 游戏加载成功率
- 用户游戏时长
- 全屏使用率

### 2. 用户行为指标
- 页面停留时间
- 跳出率
- 用户访问路径
- 设备类型分布

### 3. 社交互动指标
- 游戏分享次数
- 链接复制次数
- 推荐点击率

## 🛡️ 隐私与合规

### 1. 隐私配置
```javascript
gtag('config', 'G-F1S6GMESB8', {
  // IP匿名化
  anonymize_ip: true,
  
  // 禁用广告功能（可选）
  allow_ad_personalization_signals: false,
  
  // 禁用谷歌信号（可选）
  allow_google_signals: false
})
```

### 2. GDPR合规
- 考虑添加Cookie同意横幅
- 提供数据删除选项
- 更新隐私政策

### 3. 数据保留
- 设置适当的数据保留期
- 定期审查收集的数据

## 🚀 开发环境vs生产环境

### 开发环境
- Analytics **不会**加载
- 控制台会显示事件调用但不发送数据
- 用于调试和测试

### 生产环境
- Analytics正常工作
- 所有事件发送到GA4
- 实时数据可在GA4界面查看

## 📈 查看数据

### 1. 实时报告
- Google Analytics → 报告 → 实时
- 查看当前在线用户和事件

### 2. 事件报告
- Google Analytics → 报告 → 参与度 → 事件
- 查看自定义事件数据

### 3. 页面和屏幕报告
- Google Analytics → 报告 → 参与度 → 页面和屏幕
- 分析页面性能

## 🔧 故障排除

### 1. 数据未显示
- 确认在生产环境
- 检查GA ID是否正确
- 验证网络请求（开发者工具 → Network）

### 2. 事件未触发
- 检查控制台错误
- 确认`window.trackGameEvent`函数存在
- 验证事件参数格式

### 3. 重复数据
- 确保GA脚本只加载一次
- 检查是否有重复的事件监听器

## 📱 移动端优化

- 自动适配移动设备
- 触摸事件正常追踪
- 移动端专用事件（如全屏切换）

## 🎯 建议的改进

1. **添加更多游戏事件**
   - 游戏暂停/恢复
   - 关卡进度
   - 错误/崩溃追踪

2. **用户体验优化**
   - 页面加载性能追踪
   - 错误监控
   - 搜索功能分析

3. **高级分析**
   - 漏斗分析
   - 队列分析
   - A/B测试支持

你的Google Analytics已完全配置并正常运行！🎉 