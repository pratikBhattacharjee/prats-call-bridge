import "./PlayerSetup.css";

import { GameSetupData, Player } from "../types/game";
import React, { useState } from "react";

interface PlayerSetupProps {
  onStartGame: (gameSetup: GameSetupData) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame }) => {
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", "", ""]);
  const [playerScores, setPlayerScores] = useState<number[]>([0, 0, 0, 0]);
  const [startingRound, setStartingRound] = useState<number>(1);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
    setError("");
  };

  const handleScoreChange = (index: number, score: number) => {
    const newScores = [...playerScores];
    newScores[index] = score;
    setPlayerScores(newScores);
    setError("");
  };

  const handleStartGame = () => {
    // Validate all names are entered
    if (playerNames.some((name) => name.trim() === "")) {
      setError("Please enter all player names");
      return;
    }

    // Check for duplicate names
    const uniqueNames = new Set(
      playerNames.map((name) => name.trim().toLowerCase())
    );
    if (uniqueNames.size !== 4) {
      setError("Player names must be unique");
      return;
    }

    // Validate starting round
    if (startingRound < 1) {
      setError("Starting round must be 1 or greater");
      return;
    }

    // Create player objects
    const players: Player[] = playerNames.map((name, index) => ({
      id: index,
      name: name.trim(),
      totalScore: playerScores[index],
    }));

    const gameSetup: GameSetupData = {
      players,
      startingRound,
    };

    onStartGame(gameSetup);
  };

  return (
    <div className="player-setup">
      <div className="setup-container">
        <h1>Prat's Call Bridge</h1>
        <h2>Game Setup</h2>

        <div className="players-grid">
          {playerNames.map((name, index) => (
            <div key={index} className="player-input-group">
              <label htmlFor={`player-${index}`}>Player {index + 1}:</label>
              <input
                id={`player-${index}`}
                type="text"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Enter player ${index + 1} name`}
                maxLength={20}
              />
            </div>
          ))}
        </div>

        <div className="advanced-section">
          <button
            type="button"
            className="toggle-advanced-btn"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
          </button>

          {showAdvanced && (
            <div className="advanced-options">
              <div className="starting-round-section">
                <label htmlFor="starting-round">Starting Round:</label>
                <input
                  id="starting-round"
                  type="number"
                  min="1"
                  max="50"
                  value={startingRound}
                  onChange={(e) =>
                    setStartingRound(parseInt(e.target.value) || 1)
                  }
                  placeholder="1"
                />
                <small>Use this to continue from a specific round</small>
              </div>

              <div className="initial-scores-section">
                <h4>Initial Scores (if continuing from an existing game):</h4>
                <div className="scores-grid">
                  {playerNames.map((name, index) => (
                    <div key={index} className="score-input-group">
                      <label htmlFor={`score-${index}`}>
                        {name || `Player ${index + 1}`}:
                      </label>
                      <input
                        id={`score-${index}`}
                        type="number"
                        value={playerScores[index]}
                        onChange={(e) =>
                          handleScoreChange(
                            index,
                            parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="start-game-btn" onClick={handleStartGame}>
          {showAdvanced && startingRound > 1
            ? `Continue from Round ${startingRound}`
            : "Start New Game"}
        </button>
      </div>
    </div>
  );
};

export default PlayerSetup;
