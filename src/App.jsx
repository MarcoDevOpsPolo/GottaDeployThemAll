import { useState } from 'react'
import './App.css'
import LandingPage from './pages/Landing'
import ChoosePokemon from './pages/PokemonSelector'

function App() {
  let [page, setPage] = useState(1)
  return (
    <>
      {page === 1 ? (<LandingPage page={page} setPage={setPage}/>) : (<ChoosePokemon page={page} setPage={setPage}/>)}
      
      
    </>
  )
}

export default App
