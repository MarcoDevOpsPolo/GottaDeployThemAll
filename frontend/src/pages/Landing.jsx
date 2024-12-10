/*entry page */


export default function LandingPage({setCurrentPage}){

    function startGame(){
            setCurrentPage(2)

        
    }
    return(
        <div className="landing-page-div">
            <h1 className="game-name"> Pokemon Game </h1>
            <button onClick={startGame} className="start-button"> Start game </button>
        </div>
    )
}

