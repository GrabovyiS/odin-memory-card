import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import MemoryCardsGrid from "./components/GameField/GameField";

import { useState } from "react";
import "./App.css";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const updateCurrentScore = (newScore) => setCurrentScore(newScore);
  const updateBestScore = (newScore) => setBestScore(newScore);

  return (
    <>
      <header className="top-header">
        <h1>Pokémon memory game</h1>
        <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
      </header>
      <main>
        <MemoryCardsGrid
          currentScore={currentScore}
          bestScore={bestScore}
          updateCurrentScore={updateCurrentScore}
          updateBestScore={updateBestScore}
        />
      </main>
    </>
  );
}

export default App;
