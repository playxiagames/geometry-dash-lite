# 🌐 DNS 配置指南 - GitHub Pages 自定义域名

## 📋 当前配置

- **域名**: `geometry-dash-lite.org`
- **DNS提供商**: Cloudflare
- **目标**: GitHub Pages 部署

## 🔧 Cloudflare DNS 配置

### 1. A记录配置（根域名）

在Cloudflare DNS管理界面添加以下A记录：

```
类型: A
名称: @  (或 geometry-dash-lite.org)
IPv4地址: 185.199.108.153
TTL: Auto
代理状态: 🟠 仅DNS (关闭CDN代理)
```

**⚠️ 重要：必须添加所有4个GitHub Pages IP地址**

```
185.199.108.153
185.199.109.153  
185.199.110.153
185.199.111.153
```

### 2. AAAA记录配置（IPv6支持）

```
类型: AAAA
名称: @
IPv6地址: 2606:50c0:8000::153
TTL: Auto
代理状态: 🟠 仅DNS
```

**完整IPv6地址列表：**
```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

### 3. CNAME记录配置（子域名）

如果要支持www子域名：

```
类型: CNAME
名称: www
目标: geometry-dash-lite.org
TTL: Auto
代理状态: 🟠 仅DNS
```

## 📁 项目文件配置

### CNAME文件
确保 `public/CNAME` 文件内容正确：

```
geometry-dash-lite.org
```

**注意事项：**
- 文件中只能有一行
- 不要包含 `https://` 或 `http://`
- 不要有多余的空格或换行符

### Next.js 配置
确保 `next.config.js` 配置支持自定义域名：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '',  // 空字符串表示根路径
  assetPrefix: '',  // 空字符串表示使用相对路径
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

## 🚀 GitHub Pages 设置

### 1. 仓库设置
1. 进入 GitHub 仓库
2. 点击 `Settings` → `Pages`
3. Source: 选择 `GitHub Actions`
4. Custom domain: 输入 `geometry-dash-lite.org`
5. ✅ 勾选 `Enforce HTTPS`

### 2. 验证配置
- [ ] CNAME文件存在于 `public/CNAME`
- [ ] DNS记录配置正确
- [ ] GitHub Pages设置完成
- [ ] HTTPS强制启用

## 🔍 验证和测试

### DNS验证命令
```bash
# 检查A记录
dig geometry-dash-lite.org A

# 检查AAAA记录  
dig geometry-dash-lite.org AAAA

# 检查CNAME记录
dig www.geometry-dash-lite.org CNAME

# 检查从多个位置的解析结果
nslookup geometry-dash-lite.org 8.8.8.8
```

### 预期输出
```bash
$ dig geometry-dash-lite.org A
;; ANSWER SECTION:
geometry-dash-lite.org. 300 IN A 185.199.108.153
geometry-dash-lite.org. 300 IN A 185.199.109.153
geometry-dash-lite.org. 300 IN A 185.199.110.153
geometry-dash-lite.org. 300 IN A 185.199.111.153
```

### 网站可用性测试
```bash
# 检查HTTP状态
curl -I https://geometry-dash-lite.org

# 检查重定向
curl -I http://geometry-dash-lite.org

# 检查SSL证书
openssl s_client -connect geometry-dash-lite.org:443 -servername geometry-dash-lite.org
```

## ⏰ 传播时间

- **DNS传播**: 通常5-30分钟，最多48小时
- **SSL证书**: GitHub自动生成，通常5-10分钟
- **第一次设置**: 可能需要等待1-2小时完全生效

## 🛠️ 故障排除

### 问题1: 域名无法访问
**解决方案:**
1. 确认DNS记录配置正确
2. 检查CNAME文件内容
3. 等待DNS传播完成
4. 清除浏览器缓存

### 问题2: SSL证书错误
**解决方案:**
1. 确保在GitHub Pages中勾选"Enforce HTTPS"
2. 等待GitHub自动生成SSL证书
3. 如果超过24小时仍有问题，重新保存GitHub Pages设置

### 问题3: 404错误
**解决方案:**
1. 检查GitHub Actions构建是否成功
2. 确认CNAME文件在构建输出中
3. 检查next.config.js配置

### 问题4: Cloudflare代理冲突
**解决方案:**
1. 将DNS记录的代理状态设置为"仅DNS"（灰色云朵）
2. 如果需要Cloudflare CDN，需要额外配置Page Rules

## 📞 技术支持

如遇问题，请检查：
1. [GitHub Pages文档](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
2. [Cloudflare DNS文档](https://developers.cloudflare.com/dns/)
3. 项目的GitHub Issues

## 🎯 最佳实践

1. **DNS记录TTL**: 设置较短的TTL（300秒）便于调试
2. **备份配置**: 记录DNS设置用于备份
3. **监控**: 使用uptime监控服务监控网站可用性
4. **HTTPS**: 始终启用HTTPS重定向
5. **性能**: 考虑使用Cloudflare CDN提升全球访问速度 