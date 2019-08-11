import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import PokemonList from './PokemonList';
import FavList from './FavList';
import PokemonDetail from './PokemonDetail';
import {PokemonObj, PokemonDBObj} from './interfaces';

const App: React.FC = () => {
  // PokemonList
  const[pokemons, setPokemons] = useState([] as PokemonObj[]);
  const[page, setPage] = useState(0);
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${20*page}`).then(response => {
      console.log(response.data.results);
      setPokemons(response.data.results);

      // let urls = response.data.map((pokemon:any) => (
      //   pokemon.url
      // ))
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
  const[favs, setFavs] = useState([] as PokemonDBObj[]);
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

  // PokemonDetail
  const [selectName, setSelectName] = useState('');
  const [detail, setDetail] = useState(null as any);
  useEffect(() => {
    if (selectName !== '') {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${selectName}`).then(response => {
        console.log(response.data);
        setDetail(response.data)
      })
    }
  }, [selectName])

  
  return (
    <div className="App">
      <h1>Pokemons with Django and React hook</h1>
      <h3>Pokemons #{page*20+1}~{(page+1)*20}</h3>
      <div className='pagenation'>
        <button onClick={lastPage}>◀️️</button>
        <PokemonList  pokemons={pokemons}
                      setSelectName={setSelectName}
                      />
        <button onClick={nextPage}>▶️</button>
      </div>
      <FavList  favs={favs}
                setSelectName={setSelectName}
                deleteFromFav={deleteFromFav}
                />
      <PokemonDetail  detail={detail}
                      favs={favs}
                      addToFav={addToFave}
                      deleteFromFav={deleteFromFav}
                      />
    </div>
  );
}

export default App;
