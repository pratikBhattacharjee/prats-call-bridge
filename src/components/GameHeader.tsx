import React from "react";
import "./GameHeader.css";

interface GameHeaderProps {
  onNewGame: () => void;
  onSaveGame: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ onNewGame, onSaveGame }) => {
  return (
    <div className="game-header">
      <h1>Prat's Call Bridge</h1>
      <div className="header-actions">
        <button className="save-btn" onClick={onSaveGame}>
          Save Game
        </button>
        <button className="new-game-btn" onClick={onNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameHeader;
