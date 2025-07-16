import React, { useEffect, useState } from 'react';
import './WinCelebration.css';

interface WinCelebrationProps {
  winnerName: string;
  onClose: () => void;
}

const WinCelebration: React.FC<WinCelebrationProps> = ({ winnerName, onClose }) => {
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    // Start fireworks animation after component mounts
    const timer = setTimeout(() => setShowFireworks(true), 100);
    
    // Auto-close after 5 seconds
    const autoClose = setTimeout(() => onClose(), 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoClose);
    };
  }, [onClose]);

  return (
    <div className="win-celebration-overlay">
      <div className="celebration-content">
        {/* Fireworks */}
        {showFireworks && (
          <>
            <div className="firework firework-1"></div>
            <div className="firework firework-2"></div>
            <div className="firework firework-3"></div>
            <div className="firework firework-4"></div>
            <div className="firework firework-5"></div>
          </>
        )}

        {/* Confetti */}
        <div className="confetti-container">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'][Math.floor(Math.random() * 6)]
              }}
            ></div>
          ))}
        </div>

        {/* Winner announcement */}
        <div className="winner-announcement">
          <h1 className="winner-title">🎉 WINNER! 🎉</h1>
          <h2 className="winner-name">{winnerName}</h2>
          <p className="winner-subtitle">Congratulations on reaching 29 points!</p>
          <div className="celebration-trophy">🏆</div>
        </div>

        {/* Close button */}
        <button className="close-celebration" onClick={onClose}>
          Continue Game
        </button>
      </div>
    </div>
  );
};

export default WinCelebration;
