/* fight */

import { useState, useEffect } from "react";
import PokemonData from "../components/PokemonData";

export default function Showdown(props){
    const [opponentPokemon, setOpponentPokemon] = useState(null);
    const [stillFight, setStillFight] = useState(true);
    useEffect(() => {
        async function fetchData(){
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/bulbasaur/`)
            const pokeData = await response.json()
            setOpponentPokemon(pokeData);
            console.log(pokeData);
        }   
        fetchData();
    }, []);
    console.log(pokemonHps);
    // props.myPokemons.stats[0].base_stat, pokeData.stats[0].base_stat

    


    

    return (
        <> 
            <div className="showdown">
                { opponentPokemon ? (
                    <>
                        <PokemonData pokemonObj={opponentPokemon}  pokemonIsYours={true} />
                        <PokemonData pokemonObj={opponentPokemon}  pokemonIsYours={false} />
                    </>
                ): <h1>"Loading...</h1>
                }
            </div>
                <button id="attack">Attack</button>
        </>
    );
}