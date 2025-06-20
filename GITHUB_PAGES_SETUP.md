# GitHub Pages 部署指南

## 🚀 快速部署步骤

### 1. 创建 GitHub 仓库
```bash
# 在 GitHub 上创建新仓库
# 仓库名可以是任意名称，例如: snake-game-site
```

### 2. 推送代码到 GitHub
```bash
# 初始化 git 仓库 (如果还没有)
git init

# 添加远程仓库
git remote add origin https://github.com/yourusername/your-repo-name.git

# 添加所有文件
git add .

# 提交代码
git commit -m "🎮 Initial commit: Snake Game Site"

# 推送到 main 分支
git push -u origin main
```

### 3. 配置 GitHub Pages
1. 进入仓库 Settings → Pages
2. Source 选择: **GitHub Actions**
3. 等待第一次 Actions 构建完成

### 4. 配置自定义域名 (可选)

#### 修改 CNAME 文件
```bash
# 编辑 public/CNAME 文件
echo "yourdomain.com" > public/CNAME
```

#### DNS 配置

**根域名 (yourdomain.com):**
```
类型: A
名称: @
值: 185.199.108.153
    185.199.109.153
    185.199.110.153
    185.199.111.153
```

**子域名 (games.yourdomain.com):**
```
类型: CNAME
名称: games
值: yourusername.github.io
```

#### GitHub 设置
1. Settings → Pages → Custom domain
2. 输入域名: `yourdomain.com`
3. 勾选 "Enforce HTTPS"

## 🛠️ 使用部署脚本

### 一键部署
```bash
npm run deploy:github
```

### 手动部署
```bash
# 构建项目
npm run build

# 推送代码 (自动触发 Actions)
git add .
git commit -m "🚀 Deploy update"
git push origin main
```

## 📋 部署检查清单

- [ ] 仓库已创建并推送代码
- [ ] GitHub Actions 配置正确
- [ ] 第一次构建成功
- [ ] 网站可以通过 GitHub Pages URL 访问
- [ ] CNAME 文件配置正确 (如使用自定义域名)
- [ ] DNS 记录配置正确 (如使用自定义域名)
- [ ] HTTPS 强制启用

## 🔧 故障排除

### 构建失败
```bash
# 本地测试构建
npm run test:build

# 查看详细错误
npm run build
```

### 域名不生效
1. 检查 DNS 设置 (可能需要 24-48 小时)
2. 确认 CNAME 文件内容正确
3. 检查 GitHub Pages 设置

### 样式/资源丢失
1. 确认 `next.config.js` 中 `basePath` 设置
2. 检查静态资源路径

## 📊 监控和维护

### 构建状态
- GitHub Actions 标签页查看构建历史
- 每次推送自动触发部署

### 网站监控
```bash
# 检查网站状态
curl -I https://yourdomain.com

# 检查构建大小
npm run build:analyze
```

## 🎯 优化建议

1. **性能优化**
   - 图片压缩
   - 代码分割
   - CDN 配置

2. **SEO 优化**
   - sitemap.xml 生成
   - robots.txt 配置
   - 结构化数据

3. **安全性**
   - HTTPS 强制
   - 安全头设置
   - 依赖更新

## 📞 技术支持

如遇问题，请检查：
1. [GitHub Pages 文档](https://docs.github.com/en/pages)
2. [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
3. 项目的 Issues 和 Discussions 