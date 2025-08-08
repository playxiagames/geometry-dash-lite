'use client';

import { useState, useEffect } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

const GameGuide = ({ guideFile, game, className = '' }) => {
  const [guideContent, setGuideContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!guideFile) {
      setLoading(false);
      return;
    }

    const loadGuide = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 尝试从 guides 文件夹加载 markdown 文件
        const response = await fetch(`/guides/${guideFile}`);
        
        if (!response.ok) {
          throw new Error('Guide not found');
        }
        
        const content = await response.text();
        setGuideContent(content);
      } catch (err) {
        console.error('Failed to load guide:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGuide();
  }, [guideFile]);

  // 如果没有攻略文件，返回空
  if (!guideFile) {
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

      {/* 加载状态 */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading guide...</span>
        </div>
      )}

      {/* 错误状态 */}
      {error && !loading && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-yellow-600 dark:text-yellow-400 mr-2">⚠️</span>
            <p className="text-yellow-800 dark:text-yellow-200">
              Strategy guide is currently being updated. Check back soon!
            </p>
          </div>
        </div>
      )}

      {/* 攻略内容 */}
      {!loading && !error && guideContent && (
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
      )}
    </div>
  );
};

export default GameGuide;