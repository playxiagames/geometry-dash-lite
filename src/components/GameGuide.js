import MarkdownRenderer from './MarkdownRenderer';

const GameGuide = ({ guideContent, game, className = '' }) => {
  // 如果没有攻略内容，返回空
  if (!guideContent) {
    return null;
  }

  return (
    <div className={`game-guide bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mt-6 ${className}`}>
      {/* 攻略标题 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center text-left">
          <span className="text-2xl mr-2">📚</span>
          Complete Strategy Guide
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-left">
          Master {game?.title} with our comprehensive guide and pro tips
        </p>
      </div>

      {/* 攻略内容 */}
      <div className="guide-content">
        <MarkdownRenderer content={guideContent} />
        
        {/* 攻略底部信息 */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <span className="mr-1">📝</span>
              <span>Strategy Guide</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">🎯</span>
              <span>Difficulty: {game?.difficulty ? `${game.difficulty}/5` : 'N/A'}</span>
            </div>
            {game?.lastUpdated && (
              <div className="flex items-center">
                <span className="mr-1">📅</span>
                <span>Updated: {new Date(game.lastUpdated).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameGuide;