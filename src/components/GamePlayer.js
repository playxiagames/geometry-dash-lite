'use client';

import { useState, useEffect, useRef } from 'react';
import { FavoriteIcon } from './FavoriteButton';
import { trackGameStart, trackGameNavigation } from '../utils/analytics';
import { GamePlayerSkeleton } from './Skeleton';

const GamePlayer = ({ game, className = '', showSkeleton = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(null);
  const gameContainerRef = useRef(null);
  const iframeRef = useRef(null);

  // 如果需要显示骨架屏（例如游戏数据还在加载中）
  if (showSkeleton || !game) {
    return <GamePlayerSkeleton className={className} />;
  }

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
    
    // 追踪游戏开始事件
    trackGameStart(game.title);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load game. Please try again.');
  };

  // 简化的iframe焦点恢复
  const restoreIframeFocus = () => {
    if (iframeRef.current) {
      try {
        iframeRef.current.focus();
      } catch (e) {
        console.warn('Failed to restore iframe focus:', e);
      }
    }
  };

  const toggleFullscreen = () => {
    const gameContainer = gameContainerRef.current;
    if (!gameContainer) {
      console.error('Game container not found');
      return;
    }

    if (!document.fullscreenElement) {
      // 在进入全屏前，添加特殊样式类来禁用过渡效果
      document.body.classList.add('fullscreen-mode');
      
      gameContainer.requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
          
          // 恢复iframe焦点
          setTimeout(restoreIframeFocus, 100);
        })
        .catch(err => {
          console.error('Fullscreen error:', err);
          // 如果出错，移除fullscreen-mode类并确保状态正确
          document.body.classList.remove('fullscreen-mode');
          setIsFullscreen(false);
        });
    } else {
      document.exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
          // 退出全屏后移除特殊样式类
          document.body.classList.remove('fullscreen-mode');
          
          // 退出全屏后也恢复焦点
          setTimeout(restoreIframeFocus, 100);
        })
        .catch(err => {
          console.error('Exit fullscreen error:', err);
          // 如果出错，确保状态正确并移除样式类
          setIsFullscreen(!!document.fullscreenElement);
          if (!document.fullscreenElement) {
            document.body.classList.remove('fullscreen-mode');
          }
        });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      
      // 确保在退出全屏时移除fullscreen-mode类
      if (!isCurrentlyFullscreen) {
        document.body.classList.remove('fullscreen-mode');
        // 退出全屏时也恢复焦点
        setTimeout(restoreIframeFocus, 100);
      }
    };

    // 处理Escape键退出全屏
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
      }
    };

    // 监听iframe加载完成后设置初始焦点
    const handleIframeLoadComplete = () => {
      setTimeout(restoreIframeFocus, 300);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);
    
    // 如果iframe已经加载，设置焦点
    if (iframeRef.current && !isLoading) {
      handleIframeLoadComplete();
    }
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
      // 清理时确保移除fullscreen-mode类
      document.body.classList.remove('fullscreen-mode');
    };
  }, [game.title, isLoading]);

  if (!game) {
    return (
      <div className="game-player-container bg-gray-100 dark:bg-slate-800 rounded-lg p-8 text-center">
        <div className="text-gray-500 dark:text-gray-400">
          <div className="text-2xl mb-2">🎮</div>
          <p>No game selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`game-player-container ${className}`}>
      {/* Game Title Header */}
      <div className="game-title-header mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white text-left">{game.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>⭐ {game.rating}</span>
              <span>•</span>
              <span>🎮 {game.playCount > 1000000 ? `${(game.playCount/1000000).toFixed(1)}M` : `${Math.floor(game.playCount/1000)}K`} plays</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Container */}
      <div 
        ref={gameContainerRef}
        className={`game-iframe-container relative bg-black rounded-lg overflow-hidden w-full ${
          isFullscreen ? 'fullscreen-active' : ''
        }`}
        style={{ 
          aspectRatio: '16/9',
          maxHeight: '100vh',
          minHeight: '580px'
        }}
        onClick={() => {
          // 点击容器时也尝试恢复iframe焦点
          if (!isLoading && !error) {
            restoreIframeFocus();
          }
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white z-10">
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                {/* 外圈动画 */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-600"></div>
                {/* 加载动画 */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
                {/* 中心图标 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg">🎮</span>
                </div>
              </div>
              <p className="text-lg font-medium">Loading {game.title}...</p>
              <p className="text-sm text-gray-300 mt-1">Please wait while the game loads</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-600 z-10">
            <div className="text-center">
              <div className="text-4xl mb-4">❌</div>
              <p className="text-lg mb-2">Game failed to load</p>
              <p className="text-sm mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setIsLoading(true);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={game.iframeUrl}
          title={game.title}
          className="w-full h-full border-0 block"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ 
            display: 'block',
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      {/* Game Controls - Bottom Bar */}
      <div className="game-controls-bar bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-b-lg px-4 py-3 mt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">Game Controls:</span>
            {game.controls && game.controls.length > 0 && (
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Use keyboard arrows</span>
                <span>•</span>
                <span>Space to pause</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Favorite Button */}
            <FavoriteIcon 
              game={game} 
              className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded transition-colors"
            />
            
            {/* Fullscreen Button with improved icon */}
            <button
              onClick={toggleFullscreen}
              className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 rounded transition-colors flex items-center justify-center"
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                // Exit fullscreen icon
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M15 9V4.5M15 9h4.5M15 9l5.25-5.25M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 15v4.5M15 15h4.5m0 0l5.25 5.25" />
                </svg>
              ) : (
                // Enter fullscreen icon  
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayer; 