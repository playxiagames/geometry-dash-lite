#!/bin/bash

# GitHub Pages 部署脚本
# 用法: npm run deploy:github

set -e  # 遇到错误立即退出

echo "🚀 开始 GitHub Pages 部署流程..."

# 检查是否在git仓库中
if [ ! -d ".git" ]; then
    echo "❌ 错误: 当前目录不是git仓库"
    exit 1
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  检测到未提交的更改，正在添加到git..."
    git add .
    
    # 获取提交信息
    read -p "请输入提交信息 (默认: 🚀 Deploy updates): " commit_msg
    commit_msg=${commit_msg:-"🚀 Deploy updates"}
    
    git commit -m "$commit_msg"
else
    echo "✅ 工作目录干净，无需提交更改"
fi

# 验证CNAME文件
echo "🔍 验证CNAME配置..."
if [ ! -f "public/CNAME" ]; then
    echo "❌ 错误: public/CNAME 文件不存在"
    echo "💡 请创建 public/CNAME 文件并添加您的域名"
    exit 1
fi

domain=$(cat public/CNAME | tr -d '\n\r')
echo "✅ 自定义域名: $domain"

# 本地构建测试
echo "🔨 进行本地构建测试..."
npm run build

# 验证构建输出
if [ ! -d "out" ]; then
    echo "❌ 错误: 构建输出目录 'out' 不存在"
    exit 1
fi

if [ ! -f "out/CNAME" ]; then
    echo "❌ 错误: CNAME文件未被复制到构建输出"
    exit 1
fi

if [ ! -f "out/sitemap.xml" ]; then
    echo "⚠️  警告: sitemap.xml未找到"
else
    url_count=$(grep -c '<url>' out/sitemap.xml)
    echo "✅ Sitemap包含 $url_count 个URL"
fi

echo "✅ 本地构建成功!"

# 获取当前分支
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  当前分支: $current_branch (建议使用main分支)"
    read -p "是否继续部署? (y/N): " confirm
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
        echo "❌ 部署已取消"
        exit 1
    fi
fi

# 推送到远程仓库
echo "📤 推送代码到GitHub..."
git push origin $current_branch

echo ""
echo "🎉 部署完成!"
echo "📋 后续步骤:"
echo "   1. 访问 GitHub Actions 页面查看构建进度"
echo "   2. 构建完成后访问: https://$domain"
echo "   3. 确保DNS设置正确指向GitHub Pages"
echo ""
echo "🔗 有用链接:"
echo "   • GitHub Actions: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
echo "   • GitHub Pages 设置: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/settings/pages"
echo "" 