import React from "react";
import { Player, RoundData } from "../types/game";
import "./Scoreboard.css";

interface ScoreboardProps {
  players: Player[];
  rounds: RoundData[];
  currentRound: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({
  players,
  rounds,
  currentRound,
}) => {
  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>

      <div className="current-scores">
        <h4>Current Standings</h4>
        <div className="scores-grid">
          {players.map((player) => (
            <div key={player.id} className="player-score">
              <div className="player-name">{player.name}</div>
              <div className="total-score">{player.totalScore}</div>
            </div>
          ))}
        </div>
      </div>

      {rounds.length > 0 && (
        <div className="rounds-history">
          <h4>Round History</h4>
          <div className="history-table">
            <div className="table-header">
              <div className="round-col">Round</div>
              {players.map((player) => (
                <div key={player.id} className="player-col">
                  {player.name}
                </div>
              ))}
            </div>

            {rounds.map((round) => (
              <div key={round.roundNumber} className="table-row">
                <div className="round-col">{round.roundNumber}</div>
                {players.map((player) => {
                  const bid = round.playerBids[player.id];
                  const tricks = round.playerScores[player.id];
                  const points = round.playerRoundPoints[player.id];

                  return (
                    <div key={player.id} className="player-col">
                      <div className="bid-tricks">
                        <span className="bid">Bid: {bid}</span>
                        <span className="tricks">Got: {tricks}</span>
                      </div>
                      <div
                        className={`round-points ${
                          points < 0 ? "negative" : "positive"
                        }`}
                      >
                        {points > 0 ? "+" : ""}
                        {points}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="game-info">
        <p>
          Current Round: <strong>{currentRound}</strong>
        </p>
        <p>
          Rounds Played: <strong>{rounds.length}</strong>
        </p>
      </div>
    </div>
  );
};

export default Scoreboard;
