import MemoryCard from "../MemoryCard/MemoryCard";
import "./MemoryCardsGrid.css";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import shuffle from "../../helpers/shuffle";

const NUMBER_OF_CARDS = 25;

const getPokemons = async () => {
  const offset = Math.floor(Math.random() * 1000);
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

function MemoryCardsGrid({
  currentScore,
  bestScore,
  updateCurrentScore,
  updateBestScore,
}) {
  const [dataFetched, setDataFetched] = useState(false);
  const [cardsData, setCardsData] = useState(null);
  const [clickedCardIds, setClickedCardIds] = useState([]);

  const fetchData = async () => {
    const pokemonData = await getPokemons();
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
    setCardsData(cardsData);
    setDataFetched(true);
  };

  if (!dataFetched) {
    fetchData();
  }

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
      updateCurrentScore(0);
      // maybe show a different screen or something
    }
  };

  return (
    <section className="memory-cards-grid">
      <header>
        <h2>Click the pokémon you have not clicked before!</h2>
        <button
          onClick={(e) => {
            randomizeCards();
            document.activeElement.blur();
          }}
          className="left-button"
        >
          Restart
        </button>
        <button onClick={() => setDataFetched(false)}>Get new Pokémon</button>
      </header>
      <div className="cards-container">
        {!dataFetched ? (
          <p>Loading pokémon...</p>
        ) : (
          cardsData.map((pokemon) => (
            <MemoryCard
              key={pokemon.id}
              id={pokemon.id}
              heading={pokemon.name}
              imageUrl={pokemon.imageUrl}
              onClick={handleCardClick}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default MemoryCardsGrid;
