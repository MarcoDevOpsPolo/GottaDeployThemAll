import { useEffect, useState } from 'react'
import './App.css'
import LandingPage from './pages/Landing'
import PokemonSelector from './pages/PokemonSelector'
import Location from './pages/Location'
import MapCanvas from './components/MapCanvas'
import Showdown from './pages/Showdown'
function App() {
  const [myPokemons, setMyPokemons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [playerState, setPlayerState] = useState({
    x: 537,
    y: 460,
    speed: 6,
    facing: 0
  })
  const [discoveredLocations, setDiscoveredLocations] = useState(false)
  const [encounterPokemon, setEncounterPokemon] = useState(null)
  const [choosedPokemon, setChoosedPokemon] = useState(null);

  let showPage
  switch (currentPage) {
    case 1:
      showPage = <LandingPage setCurrentPage={setCurrentPage} />
      break
    case 2:
      showPage = <PokemonSelector setCurrentPage={setCurrentPage} setMyPokemons={setMyPokemons} myPokemons={myPokemons} setChoosedPokemon={ setChoosedPokemon} />
      break
    case 3:
      showPage = <MapCanvas setCurrentPage={setCurrentPage} setCurrentLocation={setCurrentLocation} playerState={playerState} setPlayerState={setPlayerState} discoveredLocations={discoveredLocations} setDiscoveredLocations={setDiscoveredLocations} />
      break
    case 4:
      showPage = <Location setCurrentPage={setCurrentPage} name={currentLocation.name} url={currentLocation.url} setEncounterPokemon={setEncounterPokemon} />
      break
    case 5:
      showPage = <Showdown setCurrentPage={setCurrentPage} encounterPokemon={encounterPokemon} myPokemons={myPokemons} setMyPokemons={setMyPokemons} choosedPokemon={ choosedPokemon} setChoosedPokemon={setChoosedPokemon} />
      break
  }

  return (
    <>
      {showPage}  
    </>
  )
}

export default App
