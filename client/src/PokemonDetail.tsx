import React from 'react';
import {PokemonDBObj} from './interfaces'

interface IProps {
  detail: any,
  favs: PokemonDBObj[],
  addToFav: (name: string) => void,
  deleteFromFav: (name:string) => void
}

const PokemonDetail: React.FC<IProps> = (props: IProps) => {
  const detail: any = props.detail;
  let content;
  let button;
  let isFav: boolean = false;

  if (detail === null) {
    content = <h4>Click a pokemon to see detail</h4>
  } else {
    
    for (let pokemon of props.favs) {
      if (pokemon.name === detail.forms[0].name) {
        isFav = true;
        break;
      }
    }
  
    if (isFav) {
      button = <button onClick={() => props.deleteFromFav(detail.forms[0].name)}>❤️</button>
    } else {
      button = <button onClick={() => props.addToFav(detail.forms[0].name)}>♡</button>
    }
    
    content = <>
      <h3>
        {detail.forms[0].name}{' '}
        {button}
      </h3>
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