import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps
} from 'react-router-dom'

import PokemonList from './PokemonList';
import FavList from './FavList';
import PokemonDetail from './PokemonDetail';
import Header from './Header'
import {PokemonObj, PokemonDBObj} from './interfaces';

const App: React.FC = () => {
  const[pokemons, setPokemons] = useState([] as PokemonObj[]);
  const[page, setPage] = useState(0);
  const[favs, setFavs] = useState([] as PokemonDBObj[]);
  
  // PokemonList
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${60*page}&limit=60`).then(response => {
      console.log(response.data.results);
      setPokemons(response.data.results);
    })
  }, [page])

  function lastPage() {
    if (page !== 0) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page !== 20) {
      setPage(page + 1);
    }
  }
  
  // FavList
  useEffect(() => {
    axios.get('/api/pokemon_favs/').then(response => {
      setFavs(response.data)
    })
  }, [])

  function addToFave(name:string) {
    console.log(`add ${name} to fav list`);
    axios.post('/api/pokemon_favs/', {name}).then(reponse => {
      axios.get('/api/pokemon_favs/').then(response => {
        setFavs(response.data)
      })
    })
    
  }

  function deleteFromFav(name:string) {
    console.log(`delete ${name} from fav list`);
    axios.delete(`/api/pokemon_favs/${name}`).then(response => {
      axios.get('/api/pokemon_favs/').then(response => {
        setFavs(response.data)
      })
    })
  }

  return (
    <div className="App">
      <Router>
        <h1>Pokemons with Django and React hook</h1>
        <Header />
        <Route exact path='/' render={() => (
          <>
            <h3>Pokemons #{page*60+1}~{(page+1)*60}</h3>
            <div className='pagenation'>
              <button onClick={lastPage}>◀️️</button>
              <PokemonList  pokemons={pokemons}
                            />
              <button onClick={nextPage}>▶️</button>
            </div>
          </>
        )}/>

        <Route exact path='/favs' render={() => (
          <FavList  favs={favs}
                    deleteFromFav={deleteFromFav}
                    />
        )}/>

        <Route path='/pokemon/:name' render={(props) => (
          <PokemonDetail  {...props}
                          favs={favs}
                          addToFav={addToFave}
                          deleteFromFav={deleteFromFav}
                          />
        )}/>
      </Router>
      
      
    </div>
  );
}

export default App;
