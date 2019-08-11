import React from 'react';
import {Link} from 'react-router-dom';

interface IProps {
  favs: any[],
  deleteFromFav: (name:string) => void
}

const FavList: React.FC<IProps> = ({favs, deleteFromFav}: IProps) => {
  let content;
  if (favs.length > 0) {
    content = favs.map(pokemon => {
      return (
        <div>
          <Link to={`/pokemon/${pokemon.name}`}>
            {pokemon.name}
          </Link> {' '}
          <button onClick={() => deleteFromFav(pokemon.name)}>❤️</button></div>
      )
    })
  } else {
    content = <h4>You don't have any favourite pokemons yet!</h4>
  }

  return (
    <>
      <h3>Favorite List</h3>
      <div className='fav-list'>
        {content}
      </div>
    </> 
  );

}

export default FavList;