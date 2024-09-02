import "./ScoreBoard.css";

function ScoreBoard({ currentScore, bestScore }) {
  return (
    <>
      <div className="score-board">
        <p>Best score: {bestScore}</p>
        <p>Score: {currentScore}</p>
      </div>
    </>
  );
}

export default ScoreBoard;
