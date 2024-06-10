import { useState, useEffect} from "react"

export default function AvaliablePokemons(props){
    return(
        <div className="one-pokemon" onClick={(e) => {props.onclick(e, props.id)}}>
            <h1> {props.name} </h1>
            <img src={props.gif} className="pokemon-gif"></img>
        </div>
    )
}

