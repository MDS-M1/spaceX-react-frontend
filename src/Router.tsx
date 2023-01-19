import DefaultLayout from 'components/layouts/DefaultLayout/Default.layout';

import { Navigate, useRoutes } from 'react-router-dom';

import Home from 'views/Home/Home';
import Launch from 'views/Launch/Launch';
import Launches from 'views/Launches/Launches';

const Router = () => {
  const mainRoutes = [
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'launches', element: <Launches /> },
        { path: 'launch/:launchId', element: <Launch /> },
        { path: '404', element: <h1>Page not found</h1> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ];

  return useRoutes(mainRoutes);
};

export default Router;
