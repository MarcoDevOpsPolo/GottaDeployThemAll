/* select starting pokemon*/
import { useState, useEffect} from "react"
import AvaliablePokemons from "../components/AvailablePokemons"

export default function ChoosePokemon(){
    const userPokemon = ["bulbasaur", "charizard", "poliwhirl"]

    const [fetchedPokemons, setFetchedPokemons] = useState([])
    useEffect(() =>{
        async function fetchPokemons() {
            const fetchedData = await Promise.all(
                userPokemon.map(async (pokemon) => {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                    const data = await response.json();
                    return data;
                })
            );
            setFetchedPokemons(fetchedData);
        }
        fetchPokemons();
    }, []);

    return(
        <div className="show-pokemons">
            {fetchedPokemons.map(pokemon => <AvaliablePokemons name={pokemon.name} key={pokemon.id} gif={pokemon.sprites.other.showdown.front_default}/>)}
        </div>
    )
}

