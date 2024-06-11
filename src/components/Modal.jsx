import { useCallback, useEffect, useState } from "react"
import { TextBox } from "./TextBox"

export function Modal(props) {

    const [img, setImg] = useState()
    const [pokemon, setPokemon] = useState()
    const [textRendered, setTextRendered] = useState(false)

    const handleComplete = useCallback(() => setTextRendered(true), [])

    useEffect(() => {
        if (props.pokemon) {
            async function fetchPokemon() {
                const response = await fetch(props.pokemon.pokemon.url)
                const jsonData = await response.json()

                setImg(jsonData.sprites.other["dream_world"]["front_default"] ? jsonData.sprites.other["dream_world"]["front_default"] : 
                    jsonData.sprites["front_default"]
                )
                setPokemon(jsonData)
            }
            fetchPokemon()
        }
    }, [])

    useEffect(() => {
        if (img) {
            console.log(img)
        }
    }, [img])

    return (
        <>
            {props.pokemon ? <><h1>Whoa! A <span>{props.pokemon.pokemon.name}!</span></h1>
                {img && <>
                    <img src={img}></img>
                    <TextBox text="What an exciting encounter! What will you do now?" onComplete={handleComplete}/>
                    {textRendered && <div className="buttons"><button>Fight!</button><button>Run!</button><button>Back to the WorldMap!</button></div>}
                </>}
                
            </>
        
                : <h1>No pokemon</h1>}
        </>
    )
}