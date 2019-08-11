import React from 'react';

interface IProps {
  favs: any[],
  setSelectName: React.Dispatch<React.SetStateAction<string>>,
  deleteFromFav: (name:string) => void
}

const FavList: React.FC<IProps> = (props: IProps) => {
  const favs: any[] = props.favs; 
  let content;
  if (favs.length > 0) {
    content = favs.map(pokemon => {
      return <div onClick={() => props.setSelectName(pokemon.name)}>{pokemon.name} <button onClick={() => props.deleteFromFav(pokemon.name)}>❤️</button></div>
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