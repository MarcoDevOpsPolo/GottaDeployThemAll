import { useCallback, useEffect, useState } from "react"
import { TextBox } from "./TextBox"

export function Modal(props) {
 
    const [img, setImg] = useState(null)
    const [pokemon, setPokemon] = useState(null)
    const [textRendered, setTextRendered] = useState(false)
    const [text, setText] = useState(null)

    const handleComplete = useCallback(() => setTextRendered(true), [])

    useEffect(() => {
        if (props.pokemon && pokemon === null) {         
            async function fetchPokemon() {
                console.log("start to fetch new pokemon data")
                const response = await fetch(props.pokemon.pokemon.url)
                const jsonData = await response.json()
                const textToRender = "What an exciting encounter! What will you do now?"

                setText(textToRender)
                setImg(jsonData.sprites.other["dream_world"]["front_default"] ? jsonData.sprites.other["dream_world"]["front_default"] :
                    jsonData.sprites["front_default"]
                )
                setPokemon(jsonData)
            }
            fetchPokemon()
        }
        if (!props.pokemon) {
            setText("You're walking for a while, but there is not a single pokemon to catch. What a disappointment!")
        }
    }, [props.pokemon, text])

    const avoid = useCallback(() => {
        setTextRendered((prev) => false)
        setPokemon((prev) => null)
        setImg((prev) => null) 
        setText((prev) => null)
        props.setEncounter((prev) => ( { ...props.encounter, encount: false, pokemon: null }))
    })  

    return (
        <>
            {props.pokemon ? <>
                <h1>Whoa! A <span>{props.pokemon.pokemon.name}!</span></h1>
                {img && <>
                    <img src={img}></img>
                    {text && <TextBox text={text} onComplete={handleComplete}/>}
                    {textRendered && <div className="buttons">
                        <button>Gotta catch'em now!</button>
                        <button onClick={(e) => { avoid(e) }}>Walk forward and avoid facing with this pokemon</button>
                        <button>Leave the location</button></div>}
                </>}
            </>
                : <>
                    {text && <TextBox text={ text} onComplete={handleComplete} tag="h1"/>}
                    {textRendered && <div className="buttons">
                        <button>Leave this boring location</button>
                        <button onClick={ (e) => avoid(e)}>Walk forward, I heard something over there...</button>
                    </div>}
                </>
            }
        </>
    )
}