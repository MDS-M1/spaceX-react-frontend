import { Link } from 'react-router-dom';
import './Header.scss';

import logo from 'assets/img/logo.svg';

const Header = () => {
  return (
    <header>
      <Link to="">Launches</Link>
      <a href="/">
        <figure>
          <img src={logo} alt="SpaceX logo" />
        </figure>
      </a>
      <Link to="">Capsules</Link>
    </header>
  );
};

export default Header;
