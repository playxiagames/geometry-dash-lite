import Link from 'next/link';
import Layout from '../../components/Layout';
import blogData from '../../data/blog.json';
const { blogPosts } = blogData;

export const metadata = {
  title: 'Gaming Blog - Tips, Reviews & Rankings | Game Hub',
  description: 'Discover game reviews, professional tips, rankings and latest gaming news. Expert insights on browser games, strategy guides and gaming trends.',
  openGraph: {
    title: 'Gaming Blog - Tips, Reviews & Rankings',
    description: 'Expert gaming content: reviews, tips, rankings and news',
    type: 'website',
    url: 'https://geometry-dash-lite.org/blog',
  }
};

const categories = {
  'rankings': { name: 'Rankings', color: 'bg-purple-500' },
  'reviews': { name: 'Reviews', color: 'bg-blue-500' },
  'tips': { name: 'Tips', color: 'bg-green-500' },
  'news': { name: 'News', color: 'bg-orange-500' }
};

export default function BlogPage() {
  // 只显示已发布的文章
  const publishedPosts = blogPosts.filter(post => post.published !== false);
  const sortedPosts = publishedPosts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  const featuredPosts = sortedPosts.slice(0, 3);
  const recentPosts = sortedPosts.slice(3, 10);

  // 博客首页结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Gaming Blog - Tips, Reviews & Rankings",
    "description": "Expert gaming content: reviews, tips, rankings and news",
    "url": "https://geometry-dash-lite.org/blog/",
    "publisher": {
      "@type": "Organization",
      "name": "Game Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://geometry-dash-lite.org/images/logo.png"
      }
    },
    "blogPost": featuredPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://geometry-dash-lite.org/blog/${post.slug}/`,
      "datePublished": post.publishDate,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "image": post.thumbnail
    }))
  };

  return (
    <Layout>
      <div>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Gaming Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Expert insights, comprehensive reviews, and professional tips for gamers. 
              Stay updated with the latest trends and master your favorite games.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/blog" className="px-6 py-2 bg-gray-900 dark:bg-slate-600 text-white rounded-full hover:bg-gray-800 dark:hover:bg-slate-500 transition-colors">
              All Posts
            </Link>
            {Object.entries(categories).map(([key, category]) => (
              <Link 
                key={key}
                href={`/blog?category=${key}`} 
                className={`px-6 py-2 ${category.color} text-white rounded-full hover:opacity-80 transition-opacity`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.slug} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className={`px-3 py-1 text-sm text-white rounded-full ${categories[post.category].color}`}>
                      {categories[post.category].name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                      {new Date(post.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    <Link href={`/blog/${post.slug}/`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime} min read
                    </span>
                    <Link 
                      href={`/blog/${post.slug}/`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <article key={post.slug} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
                <div className="flex items-center mb-3">
                  <span className={`px-3 py-1 text-sm text-white rounded-full ${categories[post.category].color}`}>
                    {categories[post.category].name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                    {new Date(post.publishDate).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  <Link href={`/blog/${post.slug}/`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post.readTime} min read
                  </span>
                  <Link 
                    href={`/blog/${post.slug}/`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-gray-900 dark:bg-slate-700 rounded-lg p-8 text-center transition-colors">
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated with Gaming Trends
          </h3>
          <p className="text-gray-300 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
            Get the latest game reviews, expert tips, and industry insights delivered to your inbox. 
            Join thousands of gamers who stay ahead of the curve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <button className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
      </div>
    </Layout>
  );
}