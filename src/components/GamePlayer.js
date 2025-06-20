'use client';

import { useState, useEffect } from 'react';

const GamePlayer = ({ game, className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(null);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load game. Please try again.');
  };

  const toggleFullscreen = () => {
    const gameContainer = document.getElementById('game-container');
    if (!document.fullscreenElement) {
      gameContainer.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error('Fullscreen error:', err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error('Exit fullscreen error:', err));
    }
  };

  const shareGame = async () => {
    const shareData = {
      title: game.title,
      text: `Play ${game.title} online for free!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Game link copied to clipboard!'))
        .catch(() => alert('Failed to copy link'));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!game) {
    return (
      <div className="game-player-container bg-gray-100 rounded-lg p-8 text-center">
        <div className="text-gray-500">
          <div className="text-2xl mb-2">🎮</div>
          <p>No game selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`game-player-container ${className}`}>
      {/* Game Title Header */}
      <div className="game-title-header mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">{game.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>⭐ {game.rating}</span>
              <span>•</span>
              <span>🎮 {game.playCount > 1000000 ? `${(game.playCount/1000000).toFixed(1)}M` : `${Math.floor(game.playCount/1000)}K`} plays</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Container */}
      <div 
        id="game-container"
        className="game-iframe-container relative bg-black rounded-lg overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading {game.title}...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-600">
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
          src={game.iframeUrl}
          title={game.title}
          className="w-full h-full border-0"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>

      {/* Game Controls - Bottom Bar */}
      <div className="game-controls-bar bg-white border border-gray-200 rounded-b-lg px-4 py-3 mt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Game Controls:</span>
            {game.controls && game.controls.length > 0 && (
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>Use keyboard arrows</span>
                <span>•</span>
                <span>Space to pause</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={shareGame}
              className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center space-x-1"
              title="Share game"
            >
              <span>📤</span>
              <span>Share</span>
            </button>
            <button
              onClick={toggleFullscreen}
              className="px-3 py-1.5 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors flex items-center space-x-1"
              title="Toggle fullscreen"
            >
              <span>{isFullscreen ? '📱' : '🖥️'}</span>
              <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Game Controls Info */}
      {game.controls && game.controls.length > 0 && (
        <div className="game-controls-info mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">🎮 How to Play</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {game.controls.map((control, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {control}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GamePlayer; 