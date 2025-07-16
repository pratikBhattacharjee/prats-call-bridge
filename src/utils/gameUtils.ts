import { RoundData } from "../types/game";

/**
 * Calculate round score based on custom Spades rules:
 * - Minimum bid is 2
 * - Players win if they get exactly their bid OR their bid + 1 trick
 * - Winners get points equal to their bid
 * - Losers get negative points equal to their bid
 */
export const calculateRoundScore = (
  bid: number,
  actualTricks: number
): number => {
  // Players win only if they get exactly their bid OR their bid + 1 trick
  if (actualTricks === bid || actualTricks === bid + 1) {
    // Win: get points equal to their bid
    return bid;
  } else {
    // Lose: get negative points equal to their bid
    return -bid;
  }
};

export const calculateTotalScore = (
  rounds: RoundData[],
  playerId: number
): number => {
  return rounds.reduce((total, round) => {
    return total + (round.playerRoundPoints[playerId] || 0);
  }, 0);
};

export const saveGameToStorage = (gameState: any) => {
  localStorage.setItem("spadesGame", JSON.stringify(gameState));
};

export const loadGameFromStorage = () => {
  const saved = localStorage.getItem("spadesGame");
  return saved ? JSON.parse(saved) : null;
};

export const clearGameFromStorage = () => {
  localStorage.removeItem("spadesGame");
};
