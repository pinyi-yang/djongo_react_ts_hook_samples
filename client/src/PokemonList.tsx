import React from 'react';
import {PokemonObj} from './interfaces';
import {Link} from 'react-router-dom';

interface IProps {
  pokemons: PokemonObj[],
} 
const PokemonList: React.FC<IProps> = ({pokemons}: IProps) => {
  let content;
  if (pokemons.length > 0) {
    content = (pokemons.map((pokemon: any) => (
      <div>
        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
      </div>
    )))
  } else {
    content = 'Loading... Waiting for external api response'
  }
  return (
    <div className='pokemon-list'>
      {content}
    </div>
  )
}


export default PokemonList;