# 🎮 Game Site Template

A modern, customizable game website template built with Next.js 14 and optimized for GitHub Pages deployment. Perfect for creating your own game collection site with minimal configuration.

## ✨ Features

- **⚙️ Template-Based**: Easy customization through environment variables
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ GitHub Pages Ready**: Static export optimized for free hosting
- **🔍 SEO Optimized**: Dynamic metadata, structured data, and sitemap
- **🎨 Modern UI**: Beautiful, accessible interface with Tailwind CSS
- **🌓 Theme System**: Dark/light mode with automatic switching
- **📊 Game Management**: Easy game addition through JSON configuration
- **🔧 Feature Toggles**: Enable/disable features via configuration
- **📈 Analytics Ready**: Google Analytics integration
- **⭐ Favorites System**: Optional local storage-based favorites

## 🏗️ Project Structure

```
game-site-template/
├── public/
│   ├── images/              # Game images and assets
│   ├── CNAME               # Custom domain configuration
│   └── manifest.json       # PWA manifest
├── src/
│   ├── app/                # Next.js 14 App Router
│   │   ├── layout.js       # Root layout with dynamic metadata
│   │   ├── page.js         # Homepage
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── GamePlayer.js   # Game iframe player
│   │   ├── GameCard.js     # Game cards and grids
│   │   ├── Navigation.js   # Navigation with theme toggle
│   │   └── ThemeToggle.js  # Theme switching component
│   ├── contexts/           # React contexts
│   │   ├── ThemeContext.js # Theme management
│   │   └── FavoritesContext.js # Favorites system
│   ├── data/              # Configuration files
│   │   ├── games.json     # Game database
│   │   ├── categories.json # Game categories
│   │   └── siteConfig.json # Site configuration
│   ├── utils/             # Utility functions
│   │   ├── templateConfig.js # Template configuration
│   │   └── gameData.js    # Data management
│   └── constants/         # Style constants
├── .github/workflows/     # GitHub Actions for deployment
├── env.example           # Environment variables template
├── next.config.js        # Next.js configuration
└── TEMPLATE_USAGE.md     # Detailed usage guide
```

## 🚀 Quick Start

### 1. Use This Template

Click "Use this template" or fork this repository

### 2. Configure Your Site

```bash
# Copy environment template
cp env.example .env.local

# Edit with your site details
# NEXT_PUBLIC_SITE_NAME="Your Game Site"
# NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

### 3. Install and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

### 4. Deploy to GitHub Pages

```bash
# Deploy with one command
npm run deploy:github
```

For detailed configuration instructions, see [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md)

## 🎮 Adding New Games

### 1. Add Game Data

Edit `src/data/games.json` and add your game:

```json
{
  "id": "your-game",
  "title": "Your Game Title",
  "slug": "your-game-slug",
  "description": "Brief game description",
  "category": "arcade",
  "tags": ["fun", "casual"],
  "iframeUrl": "https://your-game-url.com",
  "thumbnail": "/images/games/thumbnails/your-game.jpg",
  "playCount": 0,
  "rating": 4.5
}
```

### 2. Add Game Thumbnail

Upload your game thumbnail to:
`public/images/games/thumbnails/your-game.jpg` (400x300px recommended)

### 3. Update Homepage (Optional)

Edit `src/data/siteConfig.json` to feature your game:

```json
{
  "homepage": {
    "popularGames": ["your-game"],
    "hotGames": ["your-game"]
  }
}
```

## 🎨 Customization

### Environment Configuration

Customize your site through `.env.local`:

```env
# Site Identity
NEXT_PUBLIC_SITE_NAME="Your Game Site"
NEXT_PUBLIC_SITE_DESCRIPTION="Your description"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"

# Branding
NEXT_PUBLIC_PRIMARY_COLOR="blue"
NEXT_PUBLIC_ACCENT_COLOR="purple"

# Features
NEXT_PUBLIC_ENABLE_FAVORITES="true"
NEXT_PUBLIC_ENABLE_THEME_TOGGLE="true"
NEXT_PUBLIC_ENABLE_ANALYTICS="true"

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
```

### Visual Customization

- **Logo**: Replace `public/images/logo.png`
- **Favicon**: Replace `public/favicon.ico`
- **Colors**: Use environment variables or edit Tailwind config
- **Styling**: All styles use Tailwind CSS classes

### Content Management

- **Games**: Edit `src/data/games.json`
- **Categories**: Edit `src/data/categories.json`
- **Navigation**: Edit `src/data/siteConfig.json`
- **Main Game**: Set `NEXT_PUBLIC_MAIN_GAME_ID`

## 📊 SEO Features

### Structured Data
- WebSite schema
- Game schema
- Organization schema

### Meta Tags
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Robots meta tags

### Performance
- Static generation
- Image optimization
- CSS/JS minification
- Lighthouse optimized

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Setup Repository**:
   - Fork or use this template
   - Enable GitHub Pages in Settings > Pages
   - Set source to "GitHub Actions"

2. **Configure Domain** (Optional):
   ```bash
   # Update public/CNAME with your domain
   echo "your-domain.com" > public/CNAME
   ```

3. **Deploy**:
   ```bash
   npm run deploy:github
   ```

### Manual Deployment

```bash
# Build static files
npm run build

# Upload 'out' folder to any static host
```

The static export works with:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any static hosting service

## 🔍 SEO Best Practices

### On-Page SEO
- ✅ Optimized title tags
- ✅ Meta descriptions
- ✅ Header structure (H1-H6)
- ✅ Alt text for images
- ✅ Internal linking

### Technical SEO
- ✅ Fast loading times
- ✅ Mobile responsive
- ✅ Structured data
- ✅ XML sitemap ready
- ✅ Clean URLs

### Content SEO
- ✅ Game descriptions
- ✅ How-to-play guides
- ✅ Game tips and strategies
- ✅ FAQ sections

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly game controls
- Optimized images for mobile
- Fast loading on slow connections

## 🔐 Security Features

- Content Security Policy ready
- Safe iframe sandboxing
- XSS protection
- HTTPS enforcement

## 🛠️ Development

### Available Scripts

```bash
npm run dev              # Development server
npm run build            # Production build
npm run deploy:github    # Deploy to GitHub Pages
npm run lint             # Code linting
```

### Adding Features

- **New Pages**: Create in `src/app/` following App Router conventions
- **Components**: Add to `src/components/` with template config support
- **Utilities**: Place in `src/utils/` for shared functionality

### Feature Flags

Control features via environment variables:

```env
NEXT_PUBLIC_ENABLE_FAVORITES="false"    # Disable favorites
NEXT_PUBLIC_ENABLE_THEME_TOGGLE="false" # Disable theme toggle
NEXT_PUBLIC_ENABLE_ANALYTICS="false"    # Disable analytics
```

## 📋 Template Checklist

- [ ] Copy `env.example` to `.env.local`
- [ ] Update site name, description, and URL
- [ ] Replace logo and favicon
- [ ] Add your games to `games.json`
- [ ] Upload game thumbnails
- [ ] Configure custom domain (optional)
- [ ] Set up Google Analytics (optional)
- [ ] Test and deploy

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Check JSON syntax in data files
2. **Images Not Loading**: Verify file paths and image formats
3. **Deployment Issues**: Check GitHub Actions logs
4. **Custom Domain**: Ensure DNS is properly configured

### Getting Help

- See [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md) for detailed instructions
- Check [GitHub Issues](https://github.com/your-repo/issues) for solutions
- Review the [GitHub Actions logs](https://github.com/your-repo/actions) for deployment issues

## 📄 License

MIT License - Feel free to use this template for your game websites!

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for utility-first CSS
- GitHub for free hosting via GitHub Pages
- The gaming community for inspiration

---

**🎮 Happy Gaming & Building!** 