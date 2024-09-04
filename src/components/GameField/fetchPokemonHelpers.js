import { TOTAL_POKEMON_COUNT } from "../../constants/constants";
import { NUMBER_OF_CARDS } from "../../constants/constants";

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

export { getPokemons, getPokemonImgUrl, getRandomOffset };
