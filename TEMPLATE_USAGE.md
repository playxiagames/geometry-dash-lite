# Game Site Template Usage Guide

This is a modern, customizable game website template built with Next.js and optimized for GitHub Pages deployment.

## 🚀 Quick Start

1. **Clone or Fork this repository**
2. **Copy and customize environment variables:**
   ```bash
   cp env.example .env.local
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run development server:**
   ```bash
   npm run dev
   ```
5. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy:github
   ```

## ⚙️ Configuration

### Environment Variables

Edit `.env.local` with your site details:

```env
# Required - Basic site information
NEXT_PUBLIC_SITE_NAME="Your Game Site"
NEXT_PUBLIC_SITE_DESCRIPTION="Your site description"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"

# Optional - Customization
NEXT_PUBLIC_PRIMARY_COLOR="blue"
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Feature toggles
NEXT_PUBLIC_ENABLE_FAVORITES="true"
NEXT_PUBLIC_ENABLE_ANALYTICS="true"
NEXT_PUBLIC_ENABLE_THEME_TOGGLE="true"
```

### Adding Games

1. **Add game data** to `src/data/games.json`
2. **Add game thumbnails** to `public/images/games/thumbnails/`
3. **Update categories** in `src/data/categories.json` if needed

### Custom Domain

1. **Update** `public/CNAME` with your domain
2. **Configure** DNS settings to point to GitHub Pages
3. **Enable** custom domain in repository Settings > Pages

## 🎨 Customization

### Branding
- Replace logo: `public/images/logo.png`
- Update favicon: `public/favicon.ico`
- Modify colors in environment variables

### Navigation
- Edit `src/data/siteConfig.json` navigation section
- Update homepage game selections

### Styling
- All styling uses Tailwind CSS
- Main styles in `src/app/globals.css`
- Component styles in individual component files

## 📦 Deployment

### GitHub Pages (Recommended)
```bash
npm run deploy:github
```

### Manual Build
```bash
npm run build
```
Output will be in the `out/` directory.

## 🔧 Features

- **Responsive Design** - Mobile-first approach
- **Dark/Light Theme** - Automatic and manual switching
- **Game Favorites** - Local storage based favorites system
- **SEO Optimized** - Meta tags, sitemap, structured data
- **Analytics Ready** - Google Analytics integration
- **Performance Optimized** - Image optimization, code splitting

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── contexts/         # React contexts (theme, favorites)
├── data/            # JSON data files
├── utils/           # Utility functions and configuration
└── constants/       # Style constants
```

## 🛠️ Development

### Adding New Pages
Create new pages in `src/app/` following Next.js App Router conventions.

### Adding Components
Create reusable components in `src/components/` with:
- Template configuration support
- Feature flag checks
- Responsive design

### Modifying Styles
- Use Tailwind CSS classes
- Update `src/constants/styles.js` for shared styles
- Maintain dark mode compatibility

## 📋 Todo Checklist

- [ ] Update site name and description
- [ ] Configure custom domain
- [ ] Add your games data
- [ ] Upload game thumbnails
- [ ] Set up Google Analytics
- [ ] Test deployment
- [ ] Configure DNS settings

## 🆘 Troubleshooting

### Build Issues
- Check all image paths are correct
- Verify JSON syntax in data files
- Ensure all required environment variables are set

### Deployment Issues
- Verify CNAME file matches your domain
- Check GitHub Pages settings
- Review GitHub Actions logs

For more detailed information, see the individual documentation files in this repository. 