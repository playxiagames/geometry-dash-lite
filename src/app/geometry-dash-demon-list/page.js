import Link from 'next/link';
import Layout from '../../components/Layout';
import demonListData from '../../data/geometry-dash-demon-list-2025.json';

export const metadata = {
  title: 'Geometry Dash Demon List 2025 - Official Rankings',
  description: 'Official Geometry Dash Demon List 2025 ranking the hardest extreme demon levels. Top 50 impossible challenges that push human skill limits.',
  openGraph: {
    title: 'Geometry Dash Demon List 2025 - Official Rankings',
    description: 'The ultimate ranking of the hardest Geometry Dash demon levels. Challenge yourself with the most extreme user-created content.',
    type: 'website',
    url: 'https://geometry-dash-lite.org/geometry-dash-demon-list/',
    images: [
      {
        url: 'https://images.geometry-dash-lite.org/demon-list-ranking.webp',
        width: 1200,
        height: 630,
        alt: 'Geometry Dash Demon List 2025 Rankings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geometry Dash Demon List 2025 - Official Rankings',
    description: 'The ultimate ranking of the hardest Geometry Dash demon levels.',
    images: ['https://images.geometry-dash-lite.org/demon-list-ranking.webp'],
  },
};

const getRankBadge = (position) => {
  switch (position) {
    case 1:
      return { 
        text: '👑 #1 CHAMPION', 
        className: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg animate-pulse',
        icon: '🏆'
      };
    case 2:
      return { 
        text: '🥈 LEGENDARY', 
        className: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white shadow-md',
        icon: '⭐'
      };
    case 3:
      return { 
        text: '🥉 MYTHIC', 
        className: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-md',
        icon: '💎'
      };
    case 4:
      return { 
        text: '🔥 INFERNAL', 
        className: 'bg-gradient-to-r from-red-500 to-red-700 text-white',
        icon: '⚡'
      };
    case 5:
      return { 
        text: '💀 NIGHTMARE', 
        className: 'bg-gradient-to-r from-purple-500 to-purple-700 text-white',
        icon: '🌟'
      };
    default:
      return null;
  }
};

const getDifficultyColor = (requirement) => {
  if (requirement >= 75) return 'text-red-600 dark:text-red-400 font-bold';
  if (requirement >= 70) return 'text-orange-600 dark:text-orange-400 font-bold';
  if (requirement >= 65) return 'text-yellow-600 dark:text-yellow-400 font-bold';
  return 'text-green-600 dark:text-green-400 font-bold';
};

export default function GeometryDashDemonListPage() {
  const topDemons = demonListData.slice(0, 50);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Geometry Dash Demon List 2025 Rankings",
    "description": "Official ranking of the hardest Geometry Dash extreme demon levels",
    "url": "https://geometry-dash-lite.org/geometry-dash-demon-list/",
    "numberOfItems": topDemons.length,
    "itemListElement": topDemons.map((demon) => ({
      "@type": "ListItem",
      "position": demon.position,
      "name": demon.name,
      "url": demon.video,
      "image": demon.thumbnail
    }))
  };

  return (
    <Layout>
      <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ⚡ Geometry Dash Demon List 2025
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-8">
              Welcome to the official <strong>Geometry Dash Demon List</strong> - the definitive ranking of the most challenging extreme demon levels ever created. 
              This <strong>Geometry Dash Demon List</strong> represents the pinnacle of difficulty in the community, featuring levels that push human skill and precision to absolute limits.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
              <span>🏆 Top 50 Extreme Demons</span>
              <span>💀 Impossibly Difficult</span>
              <span>⚡ Frame-Perfect Precision</span>
              <span>🎯 Elite Player Achievements</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-600 py-3 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-900 dark:text-white font-medium">Geometry Dash Demon List</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Introduction */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8 transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About the Geometry Dash Demon List</h2>
          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p className="mb-4">
              The <strong>Geometry Dash Demon List</strong> serves as the ultimate authority for ranking extreme demon levels within the Geometry Dash community. 
              This comprehensive <strong>Geometry Dash Demon List</strong> evaluates levels based on their difficulty, requiring frame-perfect inputs, 
              extensive memorization, and thousands of attempts to complete.
            </p>
            <p className="mb-4">
              Each entry in this <strong>Geometry Dash Demon List</strong> has been rigorously tested and verified by the world's most skilled players. 
              The ranking system considers factors such as consistency requirements, technical difficulty, and the skill ceiling needed for completion. 
              Only the most challenging user-created levels earn a position on this prestigious <strong>Geometry Dash Demon List</strong>.
            </p>
            <p>
              From the legendary #1 spot to the 50th position, every level on this <strong>Geometry Dash Demon List</strong> represents 
              months of dedication, practice, and unwavering determination from the players who conquered them.
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center transition-colors">
            <div className="text-3xl font-bold text-blue-600">50</div>
            <div className="text-gray-600 dark:text-gray-300">Extreme Demons</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center transition-colors">
            <div className="text-3xl font-bold text-orange-600">75%</div>
            <div className="text-gray-600 dark:text-gray-300">Avg. Requirement</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center transition-colors">
            <div className="text-3xl font-bold text-indigo-600">2025</div>
            <div className="text-gray-600 dark:text-gray-300">Current Year</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center transition-colors">
            <div className="text-3xl font-bold text-purple-600">∞</div>
            <div className="text-gray-600 dark:text-gray-300">Attempts Needed</div>
          </div>
        </div>

        {/* Official Website Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 rounded-lg p-6 mb-8 transition-colors">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                📊 Official Demon List Information
              </h3>
              <p className="text-blue-800 dark:text-blue-300 mb-3">
                This ranking showcases the top 50 extreme demon levels based on official data. 
                For the complete, up-to-date rankings with all demons and detailed statistics, 
                please visit the official platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://pointercrate.com/demonlist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2 shadow-md"
                >
                  🌐 Visit Official Demon List
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
                <a
                  href="https://pointercrate.com/demonlist/?submitter=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2 shadow-md"
                >
                  📝 Submit Your Records
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Rankings Grid */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-colors">
          <div className="px-6 py-4 bg-gray-900 dark:bg-slate-700 text-white">
            <h2 className="text-2xl font-bold">Top 50 Extreme Demon Rankings</h2>
            <p className="text-gray-300 dark:text-gray-200 mt-2">The most challenging extreme demon levels ranked by difficulty • Based on official data</p>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-600">
            {topDemons.map((demon) => {
              const rankBadge = getRankBadge(demon.position);
              
              return (
                <div key={demon.id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Left Side: Rank, Badge, and Thumbnail */}
                    <div className="flex flex-col items-center lg:items-start gap-4 lg:min-w-[280px]">
                      {/* Rank Number */}
                      <div className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                        #{demon.position}
                      </div>
                      
                      {/* Special Badge for Top 5 */}
                      {rankBadge && (
                        <div className={`px-4 py-2 rounded-full text-sm font-bold ${rankBadge.className} whitespace-nowrap`}>
                          {rankBadge.icon} {rankBadge.text}
                        </div>
                      )}
                      
                      {/* Thumbnail - Responsive sizes with video link */}
                      <div className="relative w-full max-w-sm">
                        <a
                          href={demon.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block relative group cursor-pointer"
                          title={`Watch ${demon.name} completion video`}
                        >
                          <img 
                            src={demon.thumbnail} 
                            alt={`${demon.name} gameplay preview`}
                            className="w-full h-40 sm:h-48 md:h-56 lg:h-48 xl:h-56 rounded-xl object-cover shadow-xl group-hover:shadow-2xl transition-all duration-300"
                            loading="lazy"
                          />
                          {/* Video Play Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white bg-opacity-90 rounded-full p-3 group-hover:scale-110 transition-transform duration-200">
                              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                              </svg>
                            </div>
                          </div>
                          {/* Video indicator badge */}
                          <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium opacity-90">
                            <svg className="w-3 h-3 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                            </svg>
                            VIDEO
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Right Side: Level Information */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {demon.name}
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Publisher:</span>
                          <span className={demon.publisher.banned ? 'line-through text-red-500 dark:text-red-400' : 'text-blue-600 dark:text-blue-400 font-bold'}>
                            {demon.publisher.name}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Verifier:</span>
                          <span className={demon.verifier.banned ? 'line-through text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400 font-bold'}>
                            {demon.verifier.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Difficulty:</span>
                          <span className={`font-bold text-xl ${getDifficultyColor(demon.requirement)}`}>
                            {demon.requirement}% Requirement
                          </span>
                        </div>
                      </div>
                      
                      <a
                        href={demon.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                        </svg>
                        Watch Completion Video
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Understanding the Demon List */}
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Understanding the Geometry Dash Demon List</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🏆 Ranking Criteria</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• <strong>Technical Difficulty:</strong> Frame-perfect inputs and precise timing requirements</li>
                <li>• <strong>Consistency:</strong> Ability to repeatedly execute difficult sections</li>
                <li>• <strong>Length:</strong> Duration of challenging gameplay segments</li>
                <li>• <strong>Memory Requirements:</strong> Amount of pattern memorization needed</li>
                <li>• <strong>Community Consensus:</strong> Agreement among top players on difficulty placement</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">💀 Difficulty Levels</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300"><strong>75%+ Requirement:</strong> Nearly Impossible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300"><strong>70-74% Requirement:</strong> Extremely Difficult</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300"><strong>65-69% Requirement:</strong> Very Difficult</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300"><strong>60-64% Requirement:</strong> Challenging</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Achievement Recognition */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md text-white p-6">
          <h2 className="text-2xl font-bold mb-4">🌟 Elite Player Recognition</h2>
          <p className="text-purple-100 mb-4">
            The <strong>Geometry Dash Demon List</strong> not only ranks levels but celebrates the incredible achievements of players who conquer these seemingly impossible challenges. 
            Each completion represents hundreds or thousands of hours of dedicated practice, making every verified run a testament to human determination and skill.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">🥇</div>
              <div className="font-semibold">First Completions</div>
              <div className="text-purple-200 text-sm">Players who achieve the first verification of new extreme demons</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold">Consistency Masters</div>
              <div className="text-purple-200 text-sm">Players who achieve multiple completions of top-tier demons</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold">Record Setters</div>
              <div className="text-purple-200 text-sm">Players who complete demons with minimal attempt counts</div>
            </div>
          </div>
        </div>

        {/* Community Impact */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🌍 Impact on the Geometry Dash Community</h2>
          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p className="mb-4">
              The <strong>Geometry Dash Demon List</strong> has evolved into more than just a ranking system—it's become the cornerstone of competitive achievement within the Geometry Dash community. 
              This <strong>Geometry Dash Demon List</strong> drives innovation in level creation, pushes the boundaries of what's considered possible, and creates a shared language for discussing extreme difficulty.
            </p>
            <p className="mb-4">
              Creators use the <strong>Geometry Dash Demon List</strong> as inspiration for their own extreme demons, often aiming to craft levels worthy of inclusion. 
              Meanwhile, players view positions on this <strong>Geometry Dash Demon List</strong> as badges of honor, representing their dedication to mastering the game's most demanding content.
            </p>
            <p>
              The influence of the <strong>Geometry Dash Demon List</strong> extends beyond individual achievement, fostering a supportive community where players share strategies, 
              celebrate completions, and continuously push each other to achieve the seemingly impossible.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gray-900 dark:bg-slate-700 rounded-lg p-8 text-white transition-colors">
          <h2 className="text-3xl font-bold mb-4">Ready to Take on the Challenge?</h2>
          <p className="text-gray-300 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
            Think you have what it takes to conquer the <strong>Geometry Dash Demon List</strong>? Start with easier demons and work your way up to these legendary levels. 
            Every expert was once a beginner, and every completion starts with a single attempt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🎮 Play Geometry Dash Lite
            </Link>
            <Link 
              href="/blog/hardest-geometry-dash-levels-ranked/"
              className="bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              📖 Read Strategy Guide
            </Link>
          </div>
        </div>

      </div>
      </div>
    </Layout>
  );
}