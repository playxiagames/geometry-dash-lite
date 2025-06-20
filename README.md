# 🐍 Snake Game Website Template

A universal game website template built with Next.js, designed to showcase classic games with Snake Game as the main feature. This template is optimized for Vercel deployment and follows best practices for SEO and performance.

## ✨ Features

- **🎮 Game Player**: Embedded iframe games with fullscreen support
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Performance Optimized**: Static generation for fast loading
- **🔍 SEO Optimized**: Structured data, meta tags, and sitemap ready
- **🎨 Modern UI**: Beautiful, accessible interface with Tailwind CSS
- **📊 Game Statistics**: Play counts, ratings, and categories
- **🔄 Dynamic Content**: Easy to add new games via JSON configuration
- **🚀 Vercel Ready**: Optimized for free Vercel deployment

## 🏗️ Project Structure

```
snake-game-site/
├── public/
│   ├── images/           # Game images and assets
│   │   ├── favicon.ico       # Site favicon
│   │   └── manifest.json     # PWA manifest
│   ├── src/
│   │   ├── app/             # Next.js 13+ App Router
│   │   │   ├── layout.js    # Root layout with metadata
│   │   │   ├── page.js      # Homepage
│   │   │   └── globals.css  # Global styles
│   │   ├── components/      # React components
│   │   │   ├── GamePlayer.js    # Game iframe player
│   │   │   ├── GameCard.js      # Game cards and grids
│   │   │   ├── Navigation.js    # Top navigation
│   │   │   └── Layout.js        # Page layout
│   │   ├── data/           # Static data files
│   │   │   ├── games.json      # Game information
│   │   │   ├── categories.json # Game categories
│   │   │   └── siteConfig.json # Site configuration
│   │   └── utils/          # Utility functions
│   │       └── gameData.js # Data management functions
│   ├── next.config.js      # Next.js configuration
│   └── tailwind.config.js  # Tailwind CSS config
└── package.json        # Dependencies
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

### 3. Build for Production

```bash
npm run build
```

### 4. Deploy to Vercel

```bash
npm run deploy
```

## 🎮 Adding New Games

### Step 1: Update games.json

Add your game to `src/data/games.json`:

```json
{
  "id": "new-game",
  "title": "New Game",
  "slug": "new-game",
  "description": "Description of your new game",
  "longDescription": "Detailed description for SEO",
  "category": "arcade",
  "tags": ["tag1", "tag2"],
  "iframeUrl": "https://your-game-url.com",
  "thumbnail": "/images/games/thumbnails/new-game.jpg",
  "screenshot": "/images/games/screenshots/new-game.jpg",
  "isPopular": true,
  "isFeatured": false,
  "playCount": 100000,
  "rating": 4.5,
  "controls": ["Control instructions"],
  "tips": ["Game tips"],
  "relatedGameIds": ["snake-game", "tetris"]
}
```

### Step 2: Add Game Images

Place your game images in:
- `public/images/games/thumbnails/new-game.jpg` (200x150px)
- `public/images/games/screenshots/new-game.jpg` (800x600px)

### Step 3: Update Categories (if needed)

Add new categories to `src/data/categories.json`:

```json
{
  "id": "puzzle",
  "name": "Puzzle Games",
  "slug": "puzzle",
  "description": "Brain-teasing puzzle games",
  "icon": "🧩",
  "color": "#4ECDC4",
  "isTopLevel": true,
  "gameCount": 5
}
```

## 🎨 Customization

### Site Configuration

Edit `src/data/siteConfig.json` to customize:
- Site name and description
- SEO settings
- Homepage layout
- Footer links

### Styling

The template uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.js` - Tailwind configuration
- `src/app/globals.css` - Global styles and custom CSS

### Game Layout

Modify the homepage layout in `src/app/page.js`:
- Change the main game
- Adjust game grid sizes
- Add/remove sections

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

## 🔧 Configuration Options

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Next.js Configuration

The `next.config.js` is optimized for static export:

```javascript
const nextConfig = {
  output: 'export',        // Static export
  trailingSlash: true,     # SEO friendly URLs
  images: {
    unoptimized: true      # Vercel free tier friendly
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms

The static export in the `out/` directory can be deployed to:
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting

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

## 🛠️ Development Tools

### Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint checking
npm run export       # Static export
```

### Code Quality

- ESLint configuration
- Prettier formatting
- TypeScript ready
- Git hooks ready

## 📈 Analytics Integration

### Google Analytics

Add your GA4 tracking ID to environment variables:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Custom Events

Track game interactions:

```javascript
gtag('event', 'game_start', {
  game_name: 'Snake Game',
  game_category: 'Arcade'
});
```

## 🎯 Performance Metrics

The template is optimized for:
- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Excellent ratings
- **Loading Speed**: <2s first contentful paint
- **Bundle Size**: Optimized for fast loading

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths in JSON data
2. **Games not embedding**: Verify iframe URLs and CORS policy
3. **Build errors**: Check JSON syntax in data files
4. **Styling issues**: Verify Tailwind class names

### Getting Help

- Check the GitHub issues
- Review the documentation
- Test with different browsers

## 📄 License

MIT License - feel free to use this template for your own game websites!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vercel for the deployment platform
- All the classic game developers who inspired this template

---

**Made with ❤️ for gamers and developers** 