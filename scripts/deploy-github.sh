#!/bin/bash

# GitHub Pages 部署脚本
echo "🚀 开始部署 Snake Game 到 GitHub Pages..."

# 检查是否在正确的分支
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  当前不在 main 分支，切换到 main 分支..."
    git checkout main
fi

# 确保工作目录干净
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  检测到未提交的更改，请先提交或暂存更改"
    git status
    exit 1
fi

# 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin main

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建是否成功
if [ ! -d "out" ]; then
    echo "❌ 构建失败，out 目录不存在"
    exit 1
fi

echo "✅ 项目构建成功！"

# 推送到 GitHub (触发 Actions)
echo "🚀 推送代码到 GitHub..."
git add .
git commit -m "🚀 Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || echo "📝 没有新的更改需要提交"
git push origin main

echo ""
echo "🎉 部署命令执行完成！"
echo ""
echo "📋 接下来的步骤："
echo "1. 前往 GitHub 仓库查看 Actions 构建状态"
echo "2. 构建完成后，网站将在几分钟内可用"
echo "3. 如果配置了自定义域名，请确保 DNS 设置正确"
echo ""
echo "🌐 GitHub Pages URL: https://yourusername.github.io/your-repo-name"
echo "🏠 自定义域名: https://yourgamedomain.com (如果已配置)" 