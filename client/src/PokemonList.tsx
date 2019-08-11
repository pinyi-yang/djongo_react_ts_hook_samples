import React from 'react';
import {PokemonObj} from './interfaces';

interface IProps {
  pokemons: PokemonObj[],
  setSelectName: React.Dispatch<React.SetStateAction<string>>
} 
const PokemonList: React.FC<IProps> = (props: IProps) => {
  const pokemons: PokemonObj[] = props.pokemons;
  let content;
  if (pokemons.length > 0) {
    content = (pokemons.map((pokemon: any) => (
      <div onClick={() => props.setSelectName(pokemon.name)}>{pokemon.name}</div>
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