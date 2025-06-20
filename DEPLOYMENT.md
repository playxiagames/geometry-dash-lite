# 🚀 Vercel 部署指南

## 快速部署到 Vercel

### 方法一: 使用 Vercel CLI (推荐)

1. **安装 Vercel CLI**
```bash
npm i -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
vercel deploy --prod
```

### 方法二: 通过 GitHub 自动部署

1. **推送代码到 GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Snake Game Website"
git branch -M main
git remote add origin https://github.com/你的用户名/snake-game-site.git
git push -u origin main
```

2. **连接 Vercel**
- 访问 [vercel.com](https://vercel.com)
- 点击 "New Project"
- 选择你的 GitHub 仓库
- 点击 "Deploy"

### 方法三: 手动上传构建文件

1. **构建项目**
```bash
npm run build
```

2. **上传 out/ 目录**
- 将 `out/` 目录的内容上传到任何静态托管服务
- 如 Netlify、GitHub Pages、AWS S3 等

## ⚙️ 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Google Analytics ID
NEXT_PUBLIC_SITE_URL=https://your-domain.com  # 你的域名
```

## 🔧 自定义域名设置

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 配置 DNS 记录（Vercel 会提供详细说明）

## 📊 部署后检查清单

### ✅ 功能测试
- [ ] 主页正常加载
- [ ] 游戏可以正常播放
- [ ] 游戏切换功能正常
- [ ] 移动端响应式正常
- [ ] 全屏功能正常

### ✅ SEO 检查
- [ ] 页面标题正确显示
- [ ] Meta 描述完整
- [ ] Open Graph 图片正常
- [ ] 结构化数据有效
- [ ] robots.txt 可访问

### ✅ 性能检查
- [ ] Lighthouse 分数 > 90
- [ ] 首屏加载时间 < 3s
- [ ] 图片正常加载
- [ ] CSS/JS 文件正常

## 🛠️ 常见问题解决

### 问题1: 游戏无法加载
**解决方案**: 检查游戏 iframe URL 是否支持跨域嵌入

### 问题2: 图片无法显示
**解决方案**: 确保图片文件在 `public/images/` 目录中

### 问题3: 构建失败
**解决方案**: 检查 JSON 文件语法是否正确

### 问题4: 样式问题
**解决方案**: 清除浏览器缓存，检查 Tailwind CSS 配置

## 📈 监控和分析

### Google Analytics 设置
1. 创建 Google Analytics 4 属性
2. 复制测量 ID
3. 在环境变量中设置 `NEXT_PUBLIC_GA_ID`

### 性能监控
- 使用 Vercel Analytics (内置)
- Google PageSpeed Insights
- GTmetrix 性能测试

## 🔄 持续更新

### 添加新游戏
1. 编辑 `src/data/games.json`
2. 添加游戏图片到 `public/images/`
3. 提交并推送到 GitHub (自动部署)

### 更新网站配置
1. 编辑 `src/data/siteConfig.json`
2. 重新部署项目

## 🔒 安全配置

### 建议的安全头
项目已配置以下安全头（在 `vercel.json` 中）：
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### HTTPS 强制
Vercel 自动为所有域名启用 HTTPS

## 💰 成本优化

### Vercel 免费额度
- 100GB 带宽/月
- 100 次部署/天
- 无限静态站点

### 优化建议
- 启用图片压缩
- 使用 CDN 缓存
- 定期清理未使用的文件

## 📞 获取帮助

- **Vercel 文档**: https://vercel.com/docs
- **Next.js 文档**: https://nextjs.org/docs
- **项目 GitHub**: 在仓库中创建 Issue

---

🎉 **恭喜！** 你的 Snake Game 网站现在已经成功部署到 Vercel！ 