'use client';

import { useState, useEffect, useRef } from 'react';
import { FavoriteIcon } from './FavoriteButton';
import { trackGameStart, trackGameNavigation } from '../utils/analytics';
import { GamePlayerSkeleton } from './Skeleton';

const GamePlayer = ({ game, className = '', showSkeleton = false, priority = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState('connecting');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(null);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // 新增：游戏是否已开始加载
  const gameContainerRef = useRef(null);
  const iframeRef = useRef(null);
  const loadingTimeoutRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // 如果需要显示骨架屏（例如游戏数据还在加载中）
  if (showSkeleton || !game) {
    return <GamePlayerSkeleton className={className} />;
  }

  // 加载阶段配置
  const loadingStages = {
    connecting: { progress: 15, message: 'Connecting to game server...', duration: 1000 },
    loading: { progress: 45, message: 'Loading game resources...', duration: 5000 },
    initializing: { progress: 75, message: 'Initializing game engine...', duration: 4000 },
    ready: { progress: 100, message: 'Game ready!', duration: 500 }
  };

  // 根据游戏类型估算超时时间
  const getTimeoutDuration = () => {
    const gameUrl = game.iframeUrl?.toLowerCase() || '';
    
    // 自托管的 TurboWarp 打包游戏单文件较大(7-26MB),给足加载时间
    if (gameUrl.includes('games.playxia.com')) return 180000;

    // Unity WebGL游戏
    if (gameUrl.includes('unity') || gameUrl.includes('.unity3d')) return 200000;
    
    // 大型HTML5游戏
    if (gameUrl.includes('github.io') || gameUrl.includes('itch.io')) return 120000;
    
    // 默认超时时间
    return 100000;
  };

  const startLoadingSequence = () => {
    setLoadingStage('connecting');
    setLoadingProgress(0);
    setTimeoutReached(false);

    // 阶段转换序列
    const stages = ['connecting', 'loading', 'initializing'];
    let stageIndex = 0;

    const nextStage = () => {
      if (stageIndex < stages.length - 1) {
        stageIndex++;
        const newStage = stages[stageIndex];
        setLoadingStage(newStage);
        setTimeout(nextStage, loadingStages[newStage].duration);
      }
    };

    // 模拟进度更新
    const updateProgress = () => {
      setLoadingProgress(prevProgress => {
        setLoadingStage(currentStage => {
          const targetProgress = loadingStages[currentStage]?.progress || 0;
          const increment = Math.max((targetProgress - prevProgress) * 0.1, 0.5);
          const newProgress = Math.min(prevProgress + increment, targetProgress);
          
          // 异步更新进度，避免setState嵌套
          setTimeout(() => setLoadingProgress(newProgress), 0);
          
          return currentStage; // 返回当前阶段不变
        });
        return prevProgress; // 保持当前进度，实际更新在setTimeout中
      });
    };

    progressIntervalRef.current = setInterval(updateProgress, 150);

    // 开始阶段转换
    setTimeout(nextStage, loadingStages.connecting.duration);

    // 设置智能超时
    const timeoutDuration = getTimeoutDuration();
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(currentLoading => {
        if (currentLoading) {
          setTimeoutReached(true);
          setLoadingStage('timeout');
          setLoadingProgress(100);
        }
        return currentLoading;
      });
    }, timeoutDuration);
  };

  const handleIframeLoad = () => {
    // iframe基础结构加载完成，但游戏内容可能还在加载
    setLoadingStage('ready');
    setLoadingProgress(100);

    // 额外等待游戏内容加载
    setTimeout(() => {
      setIsLoading(false);
      setError(null);
      
      // 清理定时器
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      // 追踪游戏开始事件
      trackGameStart(game.title);
    }, 1500); // 给游戏额外1.5秒初始化时间
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load game. Please try again.');
    
    // 清理定时器
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const handleRetryLoad = () => {
    setIsLoading(true);
    setError(null);
    setTimeoutReached(false);
    setLoadingStage('connecting');
    setLoadingProgress(0);
    
    // 重新开始加载序列
    startLoadingSequence();
    
    // 重新加载iframe
    if (iframeRef.current) {
      iframeRef.current.src = game.iframeUrl;
    }
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
    // 开始加载序列
    startLoadingSequence();

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
      
      // 清理定时器
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      // 清理时确保移除fullscreen-mode类
      document.body.classList.remove('fullscreen-mode');
    };
  }, [game.title]);

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

      {/* 常驻提示：首次加载较慢（R2 缓存预热） */}
      <div className="mb-2 flex items-start gap-2 rounded-md border border-blue-100 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 text-xs text-blue-700 dark:text-blue-300">
        <span className="flex-shrink-0">💡</span>
        <span>First load may take a little longer while the game caches — it runs much faster every time after that.</span>
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
            <div className="text-center max-w-md px-6">
              {/* 游戏图标和动画 */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                {/* 外圈进度环 */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-600"></div>
                {/* 进度环 */}
                <div 
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 transition-all duration-300"
                  style={{
                    transform: `rotate(${(loadingProgress / 100) * 360}deg)`
                  }}
                ></div>
                {/* 旋转动画环（仅在非超时状态下显示） */}
                {!timeoutReached && (
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-l-blue-400 animate-spin opacity-60"></div>
                )}
                {/* 中心图标 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">
                    {timeoutReached ? '⏰' : '🎮'}
                  </span>
                </div>
              </div>

              {/* 游戏标题 */}
              <h3 className="text-xl font-bold mb-2">{game.title}</h3>
              
              {/* 进度条 */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>

              {/* 状态消息 */}
              <div className="space-y-2">
                {timeoutReached ? (
                  <>
                    <p className="text-lg font-medium text-yellow-400">Game is taking longer than expected</p>
                    <p className="text-sm text-gray-300">
                      The game might still be loading. You can wait a bit more or try refreshing.
                    </p>
                    <div className="flex gap-3 justify-center mt-4">
                      <button
                        onClick={handleRetryLoad}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        Retry
                      </button>
                      <button
                        onClick={() => {
                          setIsLoading(false);
                          setTimeoutReached(false);
                        }}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        Continue Anyway
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-medium">
                      {loadingStages[loadingStage]?.message || 'Loading...'}
                    </p>
                    <p className="text-sm text-gray-300">
                      {Math.round(loadingProgress)}% complete
                    </p>
                    <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                      💡 The first load may take a little longer while the game caches in your browser — it will start much faster every time after this. Thanks for your patience!
                    </p>
                    {loadingStage === 'ready' && (
                      <p className="text-xs text-blue-400 animate-pulse">
                        Finalizing game initialization...
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 z-10">
            <div className="text-center max-w-md px-6">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-2 text-red-700 dark:text-red-300">Loading Failed</h3>
              <p className="text-lg mb-2">Unable to load the game</p>
              <p className="text-sm mb-6 text-red-500 dark:text-red-400">{error}</p>
              
              <div className="space-y-3">
                <button
                  onClick={handleRetryLoad}
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                >
                  Try Again
                </button>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>If the problem persists:</p>
                  <ul className="mt-1 space-y-1 text-left">
                    <li>• Check your internet connection</li>
                    <li>• Refresh the page</li>
                    <li>• Try a different browser</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 点击播放覆盖层 - 仅在游戏未开始时显示 */}
        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600/90 to-purple-700/90 text-white z-20 cursor-pointer"
               onClick={() => {
                 setGameStarted(true);
                 startLoadingSequence();
               }}>
            <div className="text-center relative">
              {/* 游戏预览图片 - 更大尺寸，作为背景层 */}
              <div className="w-64 h-40 sm:w-80 sm:h-48 md:w-96 md:h-60 mx-auto rounded-xl overflow-hidden shadow-2xl relative">
                <img 
                  src={game.thumbnail} 
                  alt={game.title}
                  className="w-full h-full object-cover"
                  loading={priority ? "eager" : "lazy"}
                  fetchPriority={priority ? "high" : "auto"}
                />
                
                {/* 半透明遮罩，让播放按钮更突出 */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  {/* 播放按钮 - 叠放在图片上方 */}
                  <div className="w-20 h-20 sm:w-22 sm:h-22 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110 shadow-xl">
                    <div className="w-0 h-0 border-l-[24px] border-l-gray-800 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              
              {/* 游戏标题和提示文字 */}
              <div className="mt-6">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white drop-shadow-lg">{game.title}</h3>
                <p className="text-blue-100 text-base sm:text-lg drop-shadow">Click to start playing</p>
                
                {/* 额外的游戏信息 */}
                <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-blue-200">
                  <span className="flex items-center">
                    <span className="mr-1">⭐</span>
                    {game.rating}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">🎮</span>
                    {game.playCount > 1000000 ? `${(game.playCount/1000000).toFixed(1)}M` : `${Math.floor(game.playCount/1000)}K`} plays
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* iframe - 仅在游戏开始后渲染 */}
        {gameStarted && (
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
        )}
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