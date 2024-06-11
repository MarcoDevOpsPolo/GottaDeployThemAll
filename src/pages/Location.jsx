/* encounter at location with pokemon */

import { useEffect, useState } from "react"
import calculatePokemonEncounter from "../services/multiFuncty"
import { GameBoard } from "../components/GameBoard"

function Location(props) {
    const [pokemons, setPokemons] = useState([])
    const [encounter, setEncounter] = useState({encount: false, pokemon: null})

    useEffect(() => {
        //Mount
        async function fetchPokemons() {
            try {
                // url from props.url
                const response = await fetch("https://pokeapi.co/api/v2/location-area/1/")
                const jsonData = await response.json()
                const pokemons = jsonData["pokemon_encounters"]
                setPokemons(pokemons)
            } catch (err) {
                console.log("error from fetchPokemons: ", err)
            }
        }
        fetchPokemons()

        // Unmount
        return () => {
            console.log("Leaving the location...")
        }
    }, [])

    useEffect(() => {
        if (pokemons.length > 0) {
            let pokemon;
            let options;
            const chances = pokemons.map(poke => poke["version_details"][0]["max_chance"])
            const noEncounterChance = pokemons.reduce( (chance, poke) => poke["version_details"][0]["max_chance"] < chance ? poke["version_details"][0]["max_chance"] : chance, Math.max(...chances)) + 10
            let randomNumber = Math.round(Math.random() * Math.max(...chances))

            console.log("pokemons: ", pokemons)
            console.log("chances:", chances)
            console.log("randomNumber:", randomNumber)
            console.log("no enc: " + noEncounterChance)
            
            if (randomNumber <= noEncounterChance) {
                const rareEncounter = chances.find(chance => chance === randomNumber)
                if (rareEncounter > 0) {
                    options = pokemons.filter(poke => poke["version_details"][0]["max_chance"] === randomNumber)
                    pokemon = calculatePokemonEncounter(options)
                } else {
                    console.log("No encounter!")
                    return
                }
            }

            if (chances.includes(randomNumber)) {
                options = pokemons.filter(poke => poke["version_details"][0]["max_chance"] === randomNumber)
                pokemon = calculatePokemonEncounter(options)
            } else {
                options = pokemons.filter(poke => poke["version_details"][0]["max_chance"] >= randomNumber)
                pokemon = calculatePokemonEncounter(options)
            }
            
            setEncounter({...encounter, encount: true, pokemon: pokemon})
        }
    }, [pokemons])

    useEffect(() => {
        if (encounter.encount) {
            console.log("Encounter with this pokemon: ", encounter.pokemon)
        }
    }, [encounter])

    return (
        <>
            {/* <GameBoard location={props.name} /> */}
            <GameBoard location={"sinnoh-victory-road"} />
        </>
    )
}

export default Location