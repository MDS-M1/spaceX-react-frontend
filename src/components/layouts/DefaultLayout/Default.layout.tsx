import { Outlet } from 'react-router-dom';

import Header from 'components/sections/Header/Header';

const DefaultLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

export default DefaultLayout;
