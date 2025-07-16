import "./App.css";

import { BidAndScore, GameSetupData, GameState, RoundData } from "./types/game";
import React, { useEffect, useState } from "react";
import {
  calculateRoundScore,
  clearGameFromStorage,
  loadGameFromStorage,
  saveGameToStorage,
} from "./utils/gameUtils";

import GameHeader from "./components/GameHeader";
import PlayerSetup from "./components/PlayerSetup";
import RoundInput from "./components/RoundInput";
import Scoreboard from "./components/Scoreboard";
import WinCelebration from "./components/WinCelebration";

function App() {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    rounds: [],
    currentRound: 1,
    gameStarted: false,
  });

  const [winner, setWinner] = useState<string | null>(null);

  // Load saved game on component mount
  useEffect(() => {
    const savedGame = loadGameFromStorage();
    if (savedGame) {
      setGameState(savedGame);
    }
  }, []);

  // Auto-save game state when it changes
  useEffect(() => {
    if (gameState.gameStarted) {
      saveGameToStorage(gameState);
    }
  }, [gameState]);

  const handleStartGame = (gameSetup: GameSetupData) => {
    const newGameState: GameState = {
      players: gameSetup.players,
      rounds: [],
      currentRound: gameSetup.startingRound,
      gameStarted: true,
    };
    setGameState(newGameState);
  };

  const handleSubmitRound = (roundData: BidAndScore[]) => {
    const bids: number[] = new Array(4).fill(0);
    const scores: number[] = new Array(4).fill(0);
    const roundPoints: number[] = new Array(4).fill(0);

    // Process round data
    roundData.forEach((data) => {
      bids[data.playerId] = data.bid;
      scores[data.playerId] = data.actualTricks;
      roundPoints[data.playerId] = calculateRoundScore(
        data.bid,
        data.actualTricks
      );
    });

    // Create new round
    const newRound: RoundData = {
      roundNumber: gameState.currentRound,
      playerBids: bids,
      playerScores: scores,
      playerRoundPoints: roundPoints,
    };

    // Update player total scores
    const updatedPlayers = gameState.players.map((player) => ({
      ...player,
      totalScore: player.totalScore + roundPoints[player.id],
    }));

    // Check for winner (first to reach 29 points)
    const winningPlayer = updatedPlayers.find(player => player.totalScore >= 29);
    if (winningPlayer) {
      setWinner(winningPlayer.name);
    }

    // Update game state
    setGameState({
      ...gameState,
      players: updatedPlayers,
      rounds: [...gameState.rounds, newRound],
      currentRound: gameState.currentRound + 1,
    });
  };

  const handleNewGame = () => {
    if (
      window.confirm(
        "Are you sure you want to start a new game? This will clear all current data."
      )
    ) {
      clearGameFromStorage();
      setGameState({
        players: [],
        rounds: [],
        currentRound: 1,
        gameStarted: false,
      });
      setWinner(null); // Reset winner
    }
  };

  const handleSaveGame = () => {
    saveGameToStorage(gameState);
    alert("Game saved successfully!");
  };

  const handleCloseCelebration = () => {
    setWinner(null);
  };

  if (!gameState.gameStarted) {
    return <PlayerSetup onStartGame={handleStartGame} />;
  }

  return (
    <div className="App">
      {winner && (
        <WinCelebration 
          winnerName={winner} 
          onClose={handleCloseCelebration} 
        />
      )}
      
      <GameHeader onNewGame={handleNewGame} onSaveGame={handleSaveGame} />

      <div className="game-container">
        <RoundInput
          players={gameState.players}
          roundNumber={gameState.currentRound}
          onSubmitRound={handleSubmitRound}
        />

        <Scoreboard
          players={gameState.players}
          rounds={gameState.rounds}
          currentRound={gameState.currentRound}
        />
      </div>
    </div>
  );
}

export default App;
