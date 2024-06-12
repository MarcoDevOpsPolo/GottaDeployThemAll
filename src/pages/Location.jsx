/* encounter at location with pokemon */

import { useEffect, useState } from "react"
import calculatePokemonEncounter from "../services/multiFuncty"
import { GameBoard } from "../components/GameBoard"

function Location(props) {
    const [pokemons, setPokemons] = useState([])
    const [encounter, setEncounter] = useState({ encount: false, pokemon: null })

    useEffect(() => {
        //Mount
        async function fetchPokemons() {
            try {
                // First fetch the are URL
                const responseURL = await fetch(props.url)
                const jsonDataURL = await responseURL.json()

                // Now fetch the pokemons
                const response = await fetch(jsonDataURL.areas[0].url)
                const jsonData = await response.json()
                const pokemons = jsonData["pokemon_encounters"]
                setPokemons(pokemons)
                console.log(pokemons)
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
        if (pokemons && pokemons.length > 0 && encounter.encount === false) {
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
    }, [pokemons, encounter])

    useEffect(() => {
        if (encounter.encount) {
            console.log("Encounter with this pokemon: ", encounter.pokemon)
        }
    }, [encounter])

    return (
        <>
            <GameBoard location={props.name} setEncounter={setEncounter} encounter={encounter} city={props.name} setCurrentPage={ props.setCurrentPage} />
            {/* <GameBoard location={"eterna-city"} setEncounter={setEncounter} encounter={ encounter} /> */}
        </>
    )
}

export default Location