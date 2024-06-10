/* encounter at location with pokemon */

import { useEffect, useState } from "react"

function Location(props) {
    const [pokemons, setPokemons] = useState([])
    const [encounter, setEncounter] = useState(null)

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
            console.log("pokemons: ", pokemons)
            
        }
    }, [pokemons])

    return (
        <>
            <h1>Prepare yourself for an encounter in this Location!</h1>
            {pokemons ? <h2>Check the console! I found some pokemons to encounter with!</h2> : <h2>Pokemons, where are you?...</h2>}
        </>
    )
}

export default Location