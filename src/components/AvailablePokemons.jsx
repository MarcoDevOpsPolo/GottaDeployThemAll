import { useState, useEffect} from "react"

export default function AvaliablePokemons(props){
    return(
        <div className="one-pokemon">
            <h1 key={props.id}> {props.name} </h1>
            <img src={props.gif} className="pokemon-gif"></img>
        </div>
    )
}

