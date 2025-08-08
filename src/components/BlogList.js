import BlogPost from './BlogPost';

export default function BlogList({ 
  posts, 
  variant = 'grid', 
  showCategory = true,
  showPagination = false,
  itemsPerPage = 9,
  currentPage = 1 
}) {
  // Sort posts by publish date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.publishDate) - new Date(a.publishDate)
  );

  // Pagination logic
  const totalPages = showPagination ? Math.ceil(sortedPosts.length / itemsPerPage) : 1;
  const startIndex = showPagination ? (currentPage - 1) * itemsPerPage : 0;
  const endIndex = showPagination ? startIndex + itemsPerPage : sortedPosts.length;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No blog posts found</div>
        <p className="text-gray-400">Check back later for new content!</p>
      </div>
    );
  }

  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {paginatedPosts.map((post) => (
        <BlogPost 
          key={post.slug} 
          post={post} 
          variant="card"
        />
      ))}
    </div>
  );

  const renderList = () => (
    <div className="space-y-8">
      {paginatedPosts.map((post) => (
        <BlogPost 
          key={post.slug} 
          post={post} 
          variant="list"
        />
      ))}
    </div>
  );

  const renderCompact = () => (
    <div className="space-y-6">
      {paginatedPosts.map((post) => (
        <BlogPost 
          key={post.slug} 
          post={post} 
          variant="compact"
        />
      ))}
    </div>
  );

  const renderMasonry = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      {paginatedPosts.map((post) => (
        <div key={post.slug} className="break-inside-avoid mb-8">
          <BlogPost post={post} variant="card" />
        </div>
      ))}
    </div>
  );

  const renderPagination = () => {
    if (!showPagination || totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <nav className="flex items-center justify-center space-x-2 mt-12" aria-label="Pagination">
        {/* Previous button */}
        <button
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
          }`}
        >
          Previous
        </button>

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
          }`}
        >
          Next
        </button>
      </nav>
    );
  };

  return (
    <section className="w-full">
      {/* Results count */}
      <div className="mb-8">
        <p className="text-gray-600 text-sm">
          Showing {paginatedPosts.length} of {sortedPosts.length} articles
        </p>
      </div>

      {/* Posts */}
      {variant === 'grid' && renderGrid()}
      {variant === 'list' && renderList()}
      {variant === 'compact' && renderCompact()}
      {variant === 'masonry' && renderMasonry()}

      {/* Pagination */}
      {renderPagination()}
    </section>
  );
}