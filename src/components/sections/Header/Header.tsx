import { Link } from 'react-router-dom';
import './Header.scss';

import logo from 'assets/img/logo.svg';

const Header = () => {
  return (
    <header>
      <Link to="/launches">Launches</Link>
      <Link to="/">
        <figure>
          <img src={logo} alt="SpaceX logo" />
        </figure>
      </Link>
      <Link to="/capsules">Capsules</Link>
    </header>
  );
};

export default Header;
