import { Outlet } from 'react-router-dom';

import Footer from 'components/sections/Footer/Footer';
import Header from 'components/sections/Header/Header';

const DefaultLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default DefaultLayout;
