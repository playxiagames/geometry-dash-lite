import { notFound } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import blogData from '../../../data/blog.json';
const { blogPosts } = blogData;
import 'highlight.js/styles/github.css';

const categories = {
  'rankings': { name: 'Rankings', color: 'bg-purple-500' },
  'reviews': { name: 'Reviews', color: 'bg-blue-500' },
  'tips': { name: 'Tips', color: 'bg-green-500' },
  'news': { name: 'News', color: 'bg-orange-500' }
};

export async function generateMetadata({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://geometry-dash-lite.org/blog/${post.slug}/`,
      images: [
        {
          url: post.thumbnail,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      article: {
        publishedTime: post.publishDate,
        authors: [post.author],
        tags: post.tags,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.thumbnail],
    },
  };
}

export async function generateStaticParams() {
  // 只为已发布的文章生成静态页面
  const publishedPosts = blogPosts.filter(post => post.published !== false);
  return publishedPosts.map((post) => ({
    slug: post.slug,
  }));
}

async function getBlogContent(slug) {
  try {
    const fs = require('fs');
    const path = require('path');
    const content = fs.readFileSync(
      path.join(process.cwd(), 'src/data/blog', `${slug}.md`),
      'utf8'
    );
    return content;
  } catch (error) {
    return null;
  }
}

export default async function BlogPostPage({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  // 检查文章是否存在且已发布
  if (!post || post.published === false) {
    notFound();
  }

  const content = await getBlogContent(params.slug);
  
  if (!content) {
    notFound();
  }

  // Get related posts - 只显示已发布的相关文章
  const relatedPosts = blogPosts
    .filter(p => p.slug !== params.slug && 
                 p.published !== false && (
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3);

  const publishDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // 结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Game Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://geometry-dash-lite.org/images/logo.png"
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "image": post.thumbnail,
    "url": `https://geometry-dash-lite.org/blog/${post.slug}/`,
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.readTime * 200, // 估算字数
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://geometry-dash-lite.org/blog/${post.slug}/`
    }
  };

  return (
    <Layout>
      <div>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Breadcrumb */}
      <nav className="bg-gray-50 dark:bg-slate-800 py-4 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{post.title}</span>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-6">
            <span className={`px-4 py-2 text-sm text-white rounded-full ${categories[post.category].color}`}>
              {categories[post.category].name}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">By {post.author}</span>
                <span className="mx-2">•</span>
                <time dateTime={post.publishDate}>{publishDate}</time>
                <span className="mx-2">•</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Share:</span>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://geometry-dash-lite.org/blog/${post.slug}/`)}`}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://geometry-dash-lite.org/blog/${post.slug}/`)}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.thumbnail && (
          <div className="mb-12">
            <img 
              src={post.thumbnail} 
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-gray dark:prose-invert max-w-none mb-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">{children}</h3>,
              p: ({children}) => <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>,
              ul: ({children}) => <ul className="mb-6 list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">{children}</ul>,
              ol: ({children}) => <ol className="mb-6 list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">{children}</ol>,
              li: ({children}) => <li className="leading-relaxed">{children}</li>,
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-blue-500 pl-6 py-2 mb-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-700 rounded-r">
                  {children}
                </blockquote>
              ),
              code: ({children}) => (
                <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
                  {children}
                </code>
              ),
              pre: ({children}) => (
                <pre className="bg-gray-900 dark:bg-slate-800 text-white dark:text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                  {children}
                </pre>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-12 pb-8 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 dark:bg-slate-800 py-12 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => (
                <article key={relatedPost.slug} className="bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={relatedPost.thumbnail} 
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className={`px-3 py-1 text-sm text-white rounded-full ${categories[relatedPost.category].color}`}>
                        {categories[relatedPost.category].name}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${relatedPost.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link 
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
      </div>
    </Layout>
  );
}