import DefaultLayout from 'components/layouts/DefaultLayout/Default.layout';

import { Navigate, useRoutes } from 'react-router-dom';

import Home from 'views/Home/Home';

const Router = () => {
  const mainRoutes = [
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: '404', element: <h1>Page not found</h1> },
      ],
    },
    { path: '*', element: <Navigate to='/404' replace /> },
  ];

  return useRoutes(mainRoutes);
};

export default Router;
