import { useState } from "react";
import PinkButton from "./components/PinkButton";
import { Pokemon } from "./interfaces/PokemonInterface";

const PokeReact = () => {
  const [pokeName1, setPokeName1] = useState<string>("");
  const [pokeName2, setPokeName2] = useState<string>("");
  const [pokemon1Data, setPokemon1Data] = useState<Pokemon | null>(null);
  const [pokemon2Data, setPokemon2Data] = useState<Pokemon | null>(null);
  const [hasFightResults, setHasFightResults] = useState<boolean>(false);
  const [pkmn1HP, setpkmn1HP] = useState(0);
  const [pkmn2HP, setpkmn2HP] = useState(0);

  const fetchYourPokemon = async () => {
    const fetchPokemonAPI = await fetch(`http://localhost:3000/getyourpokemon?name=${pokeName1}`);
    const fetchPokemonData = await fetchPokemonAPI.json();
    setPokemon1Data(fetchPokemonData);
  };

  const fetchEnemyPokemon = async () => {
    const fetchEnemyPokemonAPI = await fetch(`http://localhost:3000/getenemypokemon?name=${pokeName2}`);
    const fetchEnemyPokemonData = await fetchEnemyPokemonAPI.json();
    setPokemon2Data(fetchEnemyPokemonData);
  };

  const battleresults = () => {
    const pokemon1HPDMGD =
      (pokemon1Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0) +
        (pokemon1Data?.stats.find((s) => s.stat.name === "defense")?.base_stat || 0) -
        (pokemon2Data?.stats.find((s) => s.stat.name === "attack")?.base_stat || 0);
    setpkmn1HP(pokemon1HPDMGD);
    const pokemon2HPDMGD =
      (pokemon2Data?.stats.find((s) => s.stat.name === "hp")?.base_stat || 0) +
      (pokemon2Data?.stats.find((s) => s.stat.name === "defense")?.base_stat || 0) -
      (pokemon1Data?.stats.find((s) => s.stat.name === "attack")?.base_stat || 0);
    setpkmn2HP(pokemon2HPDMGD);
    setHasFightResults(true);
  };

  return (
    <div className="container">
      <div className="pokemon-info">
        {pokemon1Data && (
          <div className = "transparent-box">
            <p>Name: {pokemon1Data?.name}<br />
              Image: <img src={pokemon1Data?.sprites.front_default} className="image" /><br />
              Health: {pokemon1Data?.stats.find((s) => s.stat.name === "hp")?.base_stat}<br />
              Damage: {pokemon1Data?.stats.find((s) => s.stat.name === "attack")?.base_stat}<br />
              Defense: {pokemon1Data?.stats.find((s) => s.stat.name === "defense")?.base_stat}<br />
            </p>
          </div>
        )}
      </div>
      <input type="text" placeholder="Pokemon" className="choosepokemon" value={pokeName1} onChange={(e) => setPokeName1(e.target.value)} />
      <PinkButton buttonClick={fetchYourPokemon} label="Select" />
      
      <div className="pokemon-info">
        {pokemon2Data && (
          <div className="transparent-box">
            <p>Name: {pokemon2Data?.name}<br />
              Image: <img src={pokemon2Data?.sprites.front_default} className="image" /><br />
              Health: {pokemon2Data?.stats.find((s) => s.stat.name === "hp")?.base_stat}<br />
              Damage: {pokemon1Data?.stats.find((s) => s.stat.name === "attack")?.base_stat}<br />
              Defense: {pokemon1Data?.stats.find((s) => s.stat.name === "defense")?.base_stat}<br />
            </p>
          </div>
        )}
      </div>
      <input type="text" placeholder="Pokemon" value={pokeName2} onChange={(e) => setPokeName2(e.target.value)} />
      <PinkButton buttonClick={fetchEnemyPokemon} label="Select" /><br/>
      <PinkButton buttonClick={battleresults} label={"Fight!"} />
      {hasFightResults && (
        <div className="transparent-box">
          <p>
          Pokemon Battle: <br/>
          {pokemon1Data?.name}'s HP after Damage: {pkmn1HP} <br/>
          {pokemon2Data?.name}'s HP after Damage: {pkmn2HP} <br/>
          </p>
        </div>
      )}
    </div>
  );
};

export default PokeReact;
