/* select starting pokemon*/
import { useState, useEffect} from "react"
import AvaliablePokemons from "../components/AvailablePokemons"

export default function PokemonSelector({setCurrentPage, setMyPokemons, myPokemons}){
    const userPokemon = ["bulbasaur", "charmander", "squirtle"]

    const [fetchedPokemons, setFetchedPokemons] = useState([])
    useEffect(() =>{
        async function fetchPokemons() {
            try{
                const fetchedData = await Promise.all(
                    userPokemon.map(async (pokemon) => {
                        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                        const data = await response.json()
                        return data
                    })
                );
                setFetchedPokemons(fetchedData)
            } catch(error){
                console.error(error)
            }
            
        }
        fetchPokemons()
    }, []);

    useEffect(() =>{
        if(myPokemons.length > 0){
            console.log(myPokemons)
        } 
    },[myPokemons])

    function handleChoose(e, id){
        setMyPokemons([fetchedPokemons[id]])
        setCurrentPage(3)
        
    }

    return(
        <div className="pokemon-selector">
            <h1 className="choose-text"> Choose your pokemon </h1>
            <div className="show-pokemons">
            {fetchedPokemons.map((pokemon,id) => (
                <AvaliablePokemons name={pokemon.name} id={id} key={pokemon.name} gif={pokemon.sprites.other.showdown.front_default} onclick={handleChoose}/>))}
            </div>
        </div>
        
    )
}

