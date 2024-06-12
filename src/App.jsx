import { useEffect, useState } from 'react'
import './App.css'
import LandingPage from './pages/Landing'
import PokemonSelector from './pages/PokemonSelector'
import Location from './pages/Location'
import MapCanvas from './components/MapCanvas'

function App() {
  const [myPokemons, setMyPokemons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [playerState, setPlayerState] = useState({
    x: 537,
    y: 455,
    speed: 6,
    facing: 0
  })

  let showPage
  switch (currentPage) {
    case 1:
      showPage = <LandingPage setCurrentPage={setCurrentPage} />
      break
    case 2:
      showPage = <PokemonSelector setCurrentPage={setCurrentPage} setMyPokemons={setMyPokemons} myPokemons={myPokemons} />
      break
    case 3:
      showPage = <MapCanvas setCurrentPage={setCurrentPage} setCurrentLocation={setCurrentLocation} playerState={playerState} setPlayerState={setPlayerState} />
      break
    case 4:
      showPage = <Location setCurrentPage={setCurrentPage} name={currentLocation.name} url={currentLocation.url} />
      break
    case 5:
      showPage = <Showdown setCurrentPage={setCurrentPage} />
      break
  }

  return (
    <>
      {showPage}
    </>
  )
}

export default App
