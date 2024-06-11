import { useCallback, useEffect, useState } from "react"
import { TextBox } from "./TextBox"

export function Modal(props) {
 
    const [img, setImg] = useState(null)
    const [pokemon, setPokemon] = useState(null)
    const [textRendered, setTextRendered] = useState(false)

    const handleComplete = useCallback(() => setTextRendered(true), [])

    useEffect(() => {
        console.log("POKEMON USEFECT TRIGGERED")
        console.log(props.pokemon && pokemon === null)
        console.log(props.pokemon !== null)
        console.log(pokemon === null)
        if (props.pokemon && pokemon === null) {
            
            async function fetchPokemon() {
                console.log("start to fetch new pokemon data")
                const response = await fetch(props.pokemon.pokemon.url)
                const jsonData = await response.json()

                setImg(jsonData.sprites.other["dream_world"]["front_default"] ? jsonData.sprites.other["dream_world"]["front_default"] :
                    jsonData.sprites["front_default"]
                )
                setPokemon(jsonData)
            }
            fetchPokemon()
        }

    }, [pokemon])

    useEffect(() => {
        if (img) {
            console.log(img)
        } else {
            console.log("img deleted")
        }
    }, [img])

    const avoid = useCallback(() => {
        props.setEncounter((prev) => ( { ...props.encounter, encount: false, pokemon: null }))
        setTextRendered((prev) => false)
        setPokemon((prev) => null)
        setImg((prev) => null) 
    })  

    return (
        <>
            {props.pokemon ? <>
                <h1>Whoa! A <span>{props.pokemon.pokemon.name}!</span></h1>
                {img && <>
                    <img src={img}></img>
                    <TextBox text="What an exciting encounter! What will you do now?" onComplete={handleComplete}/>
                    {textRendered && <div className="buttons">
                        <button>Gotta catch'em now!</button>
                        <button onClick={(e) => { avoid(e) }}>Walk forward and avoid facing with this pokemon</button>
                        <button>Leave the location</button></div>}
                </>}
            </>
                : <>
                <TextBox text="You're walking for a while, but there is not a single pokemon to catch. What a disappointment!" onComplete={handleComplete} tag="h1"/>
                    {textRendered && <div className="buttons">
                        <button>Leave this boring location</button>
                        <button onClick={ (e) => avoid(e)}>Walk forward, I heard something over there...</button>
                    </div>}
                </>
            }
        </>
    )
}