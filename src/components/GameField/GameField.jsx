import MemoryCardsGrid from "../MemoryCardsGrid/MemoryCardsGrid";
import Overlay from "../Overlay/Overlay";
import Loader from "../Loader/Loader";
import "./GameField.css";

import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import shuffle from "../../helpers/shuffle";

const NUMBER_OF_CARDS = 25;
const TOTAL_POKEMON_COUNT = 1302;

const getPokemons = async (offset) => {
  const pokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${NUMBER_OF_CARDS}&offset=${offset}`
  );
  const pokemonsJson = await pokemonsResponse.json();
  return pokemonsJson.results;
};

const getPokemonImgUrl = async (pokemonUrl) => {
  const pokemonResponse = await fetch(pokemonUrl);
  const pokemonJson = await pokemonResponse.json();
  return pokemonJson.sprites.front_default;
};

const getRandomOffset = () => {
  return Math.floor(Math.random() * (TOTAL_POKEMON_COUNT - NUMBER_OF_CARDS));
};

function GameField({
  currentScore,
  bestScore,
  updateCurrentScore,
  updateBestScore,
}) {
  const [dataFetched, setDataFetched] = useState(false);
  const [cardsData, setCardsData] = useState(null);
  const [clickedCardIds, setClickedCardIds] = useState([]);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameOverScore, setGameOverScore] = useState(0);
  const [pokemonListOffset, setPokemonListOffset] = useState(getRandomOffset());

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const pokemonData = await getPokemons(pokemonListOffset);
      const pokemonImageUrlPromises = [];

      for (const pokemon of pokemonData) {
        const pokemonImageUrlPromise = getPokemonImgUrl(pokemon.url);
        pokemonImageUrlPromises.push(pokemonImageUrlPromise);
      }

      const cardsData = [];
      const pokemonImgUrls = await Promise.all(pokemonImageUrlPromises);
      for (let i = 0; i < NUMBER_OF_CARDS; i++) {
        cardsData.push({
          name: pokemonData[i].name,
          imageUrl: pokemonImgUrls[i],
          id: uuid(),
        });
      }

      if (!ignore) {
        setCardsData(cardsData);
        setDataFetched(true);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [pokemonListOffset]);

  const randomizeCards = () => setCardsData(shuffle(cardsData));

  const handleCardClick = (e) => {
    if (!clickedCardIds.includes(e.target.closest(".memory-card").id)) {
      setClickedCardIds([
        ...clickedCardIds,
        e.target.closest(".memory-card").id,
      ]);
      randomizeCards();
      updateCurrentScore(currentScore + 1);
    } else {
      setClickedCardIds([]);
      randomizeCards();
      if (currentScore > bestScore) {
        updateBestScore(currentScore);
      }
      setGameOverScore(currentScore);
      setShowGameOver(true);
      updateCurrentScore(0);
    }
  };

  const handleRestartClick = () => {
    setCardsData(null);
    setClickedCardIds([]);
    updateCurrentScore(0);
    setShowGameOver(false);

    randomizeCards();
    document.activeElement.blur();
  };

  const handleNewPokemonClick = () => {
    setCardsData(null);
    setClickedCardIds([]);
    setDataFetched(false);
    setShowGameOver(false);

    setPokemonListOffset(getRandomOffset());
  };

  return (
    <section className="memory-cards-grid">
      <header>
        <h2>Find the pokémon you have not clicked before!</h2>
        <button onClick={handleRestartClick} className="left-button">
          Restart
        </button>
        <button onClick={handleNewPokemonClick}>Get new Pokémon</button>
      </header>

      {showGameOver && (
        <Overlay
          buttons={[
            { text: "Restart", onClick: handleRestartClick },
            { text: "Get new Pokémon", onClick: handleNewPokemonClick },
          ]}
          text={"Game over. Your score: " + gameOverScore}
        />
      )}

      {!dataFetched ? (
        <Loader text={"Pokémon are loading..."} />
      ) : (
        <MemoryCardsGrid
          cardsData={cardsData}
          handleCardClick={handleCardClick}
          gameOver={showGameOver}
        />
      )}
    </section>
  );
}

export default GameField;
