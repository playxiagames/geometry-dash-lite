import Link from 'next/link';

const categories = {
  'rankings': { name: 'Rankings', color: 'bg-purple-500' },
  'reviews': { name: 'Reviews', color: 'bg-blue-500' },
  'tips': { name: 'Tips', color: 'bg-green-500' },
  'news': { name: 'News', color: 'bg-orange-500' }
};

export default function BlogPost({ post, variant = 'card' }) {
  const publishDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  if (variant === 'featured') {
    return (
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-w-16 aspect-h-9">
          <img 
            src={post.thumbnail} 
            alt={post.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center mb-3">
            <span className={`px-3 py-1 text-sm text-white rounded-full ${categories[post.category].color}`}>
              {categories[post.category].name}
            </span>
            <span className="text-sm text-gray-500 ml-3">
              {publishDate}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
              {post.title}
            </Link>
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {post.readTime} min read
            </span>
            <Link 
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Read More →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'list') {
    return (
      <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-3">
          <span className={`px-3 py-1 text-sm text-white rounded-full ${categories[post.category].color}`}>
            {categories[post.category].name}
          </span>
          <span className="text-sm text-gray-500 ml-3">
            {publishDate}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>By {post.author}</span>
            <span>{post.readTime} min read</span>
          </div>
          <Link 
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Read More →
          </Link>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0">
        <div className="flex items-start space-x-4">
          <img 
            src={post.thumbnail} 
            alt={post.title}
            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-2">
              <span className={`px-2 py-1 text-xs text-white rounded-full ${categories[post.category].color}`}>
                {categories[post.category].name}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {publishDate}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                {post.title}
              </Link>
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {post.readTime} min read
              </span>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium text-xs"
              >
                Read →
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default card variant
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className={`px-3 py-1 text-sm text-white rounded-full ${categories[post.category].color}`}>
            {categories[post.category].name}
          </span>
          <span className="text-sm text-gray-500 ml-3">
            {publishDate}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>
          <Link 
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}