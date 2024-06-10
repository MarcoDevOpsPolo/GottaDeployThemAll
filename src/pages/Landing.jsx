/*entry page */

import { useState} from "react"

export default function LandingPage({setPage}){

    function startGame(){
        setPage(2)
    }
    return(
        <div class="landing-page-div">
            <h1 className="game-name"> Pokemon Game </h1>
            <button onClick={startGame} className="start-button"> Start game </button>
        </div>
    )
}

