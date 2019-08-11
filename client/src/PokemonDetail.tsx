import React, {useState, useEffect} from 'react';
import {PokemonDBObj} from './interfaces';
import {RouteComponentProps} from 'react-router-dom';
import axios from 'axios';

type RouteParams = {
  name: string
}

interface IProps extends RouteComponentProps<RouteParams>{
  favs: PokemonDBObj[],
  addToFav: (name: string) => void,
  deleteFromFav: (name:string) => void
}

const PokemonDetail: React.FC<IProps> = ({match, history, favs, addToFav, deleteFromFav}: IProps) => {
  let name = match.params.name;
  const [detail, setDetail] = useState(null as any)
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => {
      console.log(response.data);
      setDetail(response.data)
    })
  }, [name])
  let content;
  let button;
  let isFav: boolean = false;

  if (detail === null) {
    content = <h4>Click a pokemon to see detail</h4>
  } else {
    
    for (let pokemon of favs) {
      if (pokemon.name === name) {
        isFav = true;
        break;
      }
    }
  
    if (isFav) {
      button = <button onClick={() => deleteFromFav(name)}>❤️</button>
    } else {
      button = <button onClick={() => addToFav(name)}>♡</button>
    }
    
    content = <>
      <h3>
        {name}{' '}
        {button}
      </h3>
      <button onClick={() => {history.goBack()}}>BACK</button>
      <div className='icon'>
        <img src={detail.sprites.front_default} />
      </div>
      <div className='info'>
        <ul>
          <li>height: {detail.height}</li>
          <li>weight: {detail.weight}</li>
          <li>base experience: {detail.base_experience}</li>
        </ul>
      </div>

      <div className='moves'>
        <p>
          <b>Moves: </b>
          {detail.moves.map((move:any) => (
            `${move.move.name}, `
          ))}
        </p>
      </div>
    </>
  }

  return (
    <div className='detail'>
      {content}
    </div>
  )
}

export default PokemonDetail;