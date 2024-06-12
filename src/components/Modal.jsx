import { useCallback, useEffect, useState } from "react"
import { TextBox } from "./TextBox"
import upperCaseFirstLetter from "./stringManipulation"

export function Modal(props) {

    const [img, setImg] = useState(null)
    const [pokemon, setPokemon] = useState(null)
    const [textRendered, setTextRendered] = useState(false)
    const [text, setText] = useState(null)

    const handleComplete = useCallback(() => setTextRendered(true), [])

    useEffect(() => {
        if (props.pokemon && pokemon === null) {
            async function fetchPokemon() {
                const response = await fetch(props.pokemon.pokemon.url)
                const jsonData = await response.json()
                let textToRender = "What an exciting encounter! What will you do now?"
                if (props.pokemon["version_details"][0]["max_chance"] >= 90) {
                    textToRender = "Not your most exciting encounter in your life, but more than nothing."
                }

                if (props.pokemon["version_details"][0]["max_chance"] <= 10) {
                    textToRender = "You can't believe your eyes! Probably you are in a dream.. or in a nightmare? Maybe you should run..?"
                }

                setText(textToRender)
                setImg(jsonData.sprites.other["dream_world"]["front_default"] ? jsonData.sprites.other["dream_world"]["front_default"] :
                    jsonData.sprites["front_default"]
                )
                setPokemon(jsonData)
                console.log(jsonData)
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
        props.setEncounter((prev) => ({ ...props.encounter, encount: false, pokemon: null }))
    })

    return (
        <>
            {props.pokemon ? <>
                <h1>Whoa! A <span>{upperCaseFirstLetter(props.pokemon.pokemon.name)}!</span></h1>
                {img && <>
                    <img src={img}></img>
                    {text && <TextBox text={text} onComplete={handleComplete} />}
                    {textRendered && <div className="buttons">
                        <button onClick={(e) => {
                            props.setEncounterPokemon(pokemon)
                            props.setCurrentPage(5)
                        }}>Gotta catch'em now!</button>
                        <button onClick={(e) => { avoid(e) }}>Walk forward and avoid facing with this pokemon</button>
                        <button onClick={(e) => props.setCurrentPage(3)}>Leave the location</button></div>}
                </>}
            </>
                : <>
                    {text && <TextBox text={text} onComplete={handleComplete} tag="h1" />}
                    {textRendered && <div className="buttons">
                        <button onClick={(e) => props.setCurrentPage(3)}>Leave this boring location</button>
                        <button onClick={(e) => avoid(e)}>Walk forward, I heard something over there...</button>
                    </div>}
                </>
            }
        </>
    )
}