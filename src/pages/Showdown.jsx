/* fight */

import { useState, useEffect } from "react";
import PokemonData from "../components/PokemonData";

export default function Showdown(props){
    const [opponentPokemon, setOpponentPokemon] = useState(null);
    const [stillFight, setStillFight] = useState(true);
    const [pokemonHps, setPokemonHps] = useState(null);
    useEffect(() => {
        async function fetchData(){
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/bulbasaur/`)
            const pokeData = await response.json()
            setOpponentPokemon(pokeData);
            console.log(pokeData);
        }   
        fetchData();
    }, []);
    // props.myPokemons.stats[0].base_stat, pokeData.stats[0].base_stat

    


    

    return (
        <> 
            <div className="showdown">
                { opponentPokemon ? (
                    <>
                        <PokemonData myPokemon={opponentPokemon} opponentPokemon={opponentPokemon}  />
                    </>
                ): <h1>"Loading...</h1>
                }
            </div>
                <button id="attack">Attack</button>
        </>
    );
}