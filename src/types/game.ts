export interface Player {
  id: number;
  name: string;
  totalScore: number;
}

export interface RoundData {
  roundNumber: number;
  playerBids: number[];
  playerScores: number[];
  playerRoundPoints: number[];
}

export interface GameState {
  players: Player[];
  rounds: RoundData[];
  currentRound: number;
  gameStarted: boolean;
}

export interface BidAndScore {
  playerId: number;
  bid: number;
  actualTricks: number;
}

export interface GameSetupData {
  players: Player[];
  startingRound: number;
}
