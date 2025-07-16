import React, { useState } from "react";
import { Player, BidAndScore } from "../types/game";
import { calculateRoundScore } from "../utils/gameUtils";
import "./RoundInput.css";

interface RoundInputProps {
  players: Player[];
  roundNumber: number;
  onSubmitRound: (roundData: BidAndScore[]) => void;
}

const RoundInput: React.FC<RoundInputProps> = ({
  players,
  roundNumber,
  onSubmitRound,
}) => {
  const [bids, setBids] = useState<number[]>([2, 2, 2, 2]); // Start with minimum bid of 2
  const [actualTricks, setActualTricks] = useState<number[]>([0, 0, 0, 0]);
  const [showScores, setShowScores] = useState(false);
  const [error, setError] = useState<string>("");

  const handleBidChange = (playerIndex: number, bid: number) => {
    const newBids = [...bids];
    newBids[playerIndex] = bid;
    setBids(newBids);
    setError("");
  };

  const handleTricksChange = (playerIndex: number, tricks: number) => {
    const newTricks = [...actualTricks];
    newTricks[playerIndex] = tricks;
    setActualTricks(newTricks);
    setError("");
  };

  const validateAndSubmit = () => {
    // Validate bids are reasonable (2-13, minimum bid is 2)
    if (bids.some((bid) => bid < 2 || bid > 13)) {
      setError("Bids must be between 2 and 13 (minimum bid is 2)");
      return;
    }

    // Validate actual tricks sum to 13
    const totalTricks = actualTricks.reduce((sum, tricks) => sum + tricks, 0);
    if (totalTricks !== 13) {
      setError("Total tricks must equal 13");
      return;
    }

    // Validate individual trick counts
    if (actualTricks.some((tricks) => tricks < 0 || tricks > 13)) {
      setError("Tricks must be between 0 and 13");
      return;
    }

    // Create round data
    const roundData: BidAndScore[] = players.map((player, index) => ({
      playerId: player.id,
      bid: bids[index],
      actualTricks: actualTricks[index],
    }));

    onSubmitRound(roundData);

    // Reset for next round
    setBids([2, 2, 2, 2]); // Reset to minimum bid of 2
    setActualTricks([0, 0, 0, 0]);
    setShowScores(false);
  };

  return (
    <div className="round-input">
      <h3>Round {roundNumber}</h3>

      <div className="input-section">
        <h4>Enter Bids</h4>
        <div className="players-row">
          {players.map((player, index) => (
            <div key={player.id} className="player-column">
              <label>{player.name}</label>
              <input
                type="number"
                min="2"
                max="13"
                value={bids[index] === 2 ? "" : bids[index]}
                onChange={(e) =>
                  handleBidChange(index, parseInt(e.target.value) || 2)
                }
                placeholder="2"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="input-section">
        <h4>Enter Actual Tricks Won</h4>
        <div className="players-row">
          {players.map((player, index) => (
            <div key={player.id} className="player-column">
              <label>{player.name}</label>
              <input
                type="number"
                min="0"
                max="13"
                value={actualTricks[index] === 0 ? "" : actualTricks[index]}
                onChange={(e) =>
                  handleTricksChange(index, parseInt(e.target.value) || 0)
                }
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {showScores && (
        <div className="score-preview">
          <h4>Round Score Preview</h4>
          <div className="players-row">
            {players.map((player, index) => {
              const score = calculateRoundScore(
                bids[index],
                actualTricks[index]
              );
              return (
                <div key={player.id} className="player-column">
                  <label>{player.name}</label>
                  <div
                    className={`score-display ${
                      score < 0 ? "negative" : "positive"
                    }`}
                  >
                    {score > 0 ? "+" : ""}
                    {score}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="round-actions">
        <button
          className="preview-btn"
          onClick={() => setShowScores(!showScores)}
        >
          {showScores ? "Hide Preview" : "Preview Scores"}
        </button>
        <button className="submit-btn" onClick={validateAndSubmit}>
          Submit Round
        </button>
      </div>
    </div>
  );
};

export default RoundInput;
