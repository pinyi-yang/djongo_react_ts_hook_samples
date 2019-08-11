import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <Link to='/'>Home</Link> |{' '}
      <Link to='/favs'>Favorite</Link>
    </header>
  )
}

export default Header;