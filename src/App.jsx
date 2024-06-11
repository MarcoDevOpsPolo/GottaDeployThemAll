import { useEffect, useState } from 'react'
import './App.css'
import LandingPage from './pages/Landing'
import PokemonSelector from './pages/PokemonSelector'

function App() {
  const [myPokemons, setMyPokemons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  let showPage
  switch (currentPage) {
    case 1:
      showPage = <LandingPage setCurrentPage={setCurrentPage} />
      break
    case 2:
      showPage = <PokemonSelector setCurrentPage={setCurrentPage} setMyPokemons={setMyPokemons} myPokemons={myPokemons} />
      break
    case 3:
      showPage = <Map setCurrentPage={setCurrentPage} />
      break
    case 4:
      showPage = <Location setCurrentPage={setCurrentPage} />
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
