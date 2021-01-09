
import {BrowserRouter, Route} from 'react-router-dom'

import PokemonDetail from './PokemonDetail'
import PokemonList from './PokemonList'
import Homepage from './Homepage'

//App has 3 routes - homepage, paginated list of pokemon, and details for one pokemon
//Navigation is done with react router

export default () => {
  return (
    <div className='container mt-5'>
      <BrowserRouter>
        <Route path='/' exact component={Homepage}></Route>
        <Route path='/pokemon' exact component={PokemonList}></Route>
        <Route path='/pokemon/:id' exact component={PokemonDetail}></Route>
      </BrowserRouter>
    </div>
  )
}