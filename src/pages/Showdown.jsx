/* fight */

import { useState, useEffect } from "react";
import PokemonData from "../components/PokemonData";

export default function Showdown(props){
    const [opponentPokemon, setOpponentPokemon] = useState(null);
    const [stillFight, setStillFight] = useState(true);
    const [pokemonHps, setPokemonHps] = useState(null);
    let numberOfAttacks = 0;
    useEffect(() => {
        async function fetchData(){
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/bulbasaur/`)
            const pokeData = await response.json()
            setOpponentPokemon(pokeData);
            console.log(pokeData);
            setPokemonHps({yourHp: pokeData.stats[0].base_stat, opponentHp: pokeData.stats[0].base_stat});
        }   
        fetchData();
    }, []);
    // props.myPokemons.stats[0].base_stat, pokeData.stats[0].base_stat
    // useEffect(() => {
    //     setPokemonHps({
    //         ...pokemonHps,
    //         [property] : pokemonHps[property] - damage
    //     })
    //     console.log(pokemonHps.opponentHp);
    //     console.log(pokemonHps.yourHp);
    //     setMyTurn(myTurn => {
    //         if (myTurn === true){
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     });
    //     console.log(myTurn);
    // }, [numberOfAttacks])
    


    

    return (
        <> 
            <div className="showdown">
                { opponentPokemon && pokemonHps ? (
                    <>
                        <PokemonData myPokemon={opponentPokemon} opponentPokemon={opponentPokemon} pokemonHps={pokemonHps}
                         setPokemonHps={setPokemonHps} numberOfAttacks={numberOfAttacks}/>
                    </>
                ): <h1>"Loading...</h1>
                }
            </div>
                <button id="attack">Attack</button>
        </>
    );
}