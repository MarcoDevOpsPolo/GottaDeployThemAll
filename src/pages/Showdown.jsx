/* fight */

import { useState, useEffect } from "react";
import PokemonData from "../components/PokemonData";
import PokemonSelector from "./PokemonSelector";

export default function Showdown(props){
    const [stillFight, setStillFight] = useState(true);
    const [pokemonHps, setPokemonHps] = useState(null);
    let numberOfAttacks = 0;
    useEffect(() => {
        console.log("Mount showdown")
        if (props.choosedPokemon) {
            console.log("set pokeHPs")
            setPokemonHps({yourHp: props.choosedPokemon.stats[0].base_stat, opponentHp: props.encounterPokemon.stats[0].base_stat});
        }
    }, [props.choosedPokemon]);
   
    return (
        <> 
            <div className="showdown">
                { pokemonHps ? (
                    <>  
                        <PokemonData myPokemon={props.choosedPokemon} opponentPokemon={props.encounterPokemon} pokemonHps={pokemonHps}
                         setPokemonHps={setPokemonHps} numberOfAttacks={numberOfAttacks}/>
                    </>
                ) : !props.choosedPokemon ? <PokemonSelector setCurrentPage={props.setCurrentPage} setMyPokemons={props.setMyPokemons} setChoosedPokemon={props.setChoosedPokemon} myPokemons={props.myPokemons} />
            : <h1>Loading...</h1>}
            </div>
        </>
    );
}