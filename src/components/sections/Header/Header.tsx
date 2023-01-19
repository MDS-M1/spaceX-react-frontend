import { Link } from 'react-router-dom';
import './Header.scss';

import logo from 'assets/img/logo.svg';
import { useEffect, useState } from 'react';

const Header = () => {
  const [className, setClassName] = useState('');

  const scrollEvent = () => {
    if (window.scrollY > 100) {
      setClassName('scroll');
    } else {
      setClassName('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    return () =>
      window.removeEventListener('scroll', scrollEvent);
  }, []);
  return (
    <header className={className}>
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
