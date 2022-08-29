import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Accueil from './Features/Accueil/Accueil'
import AppLayout from './Features/Layout/AppLayout';

const App = () => {

  const routes = [
    { link: '/accueil', element: <Accueil /> }
  ]

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {routes.map(route => (
            <Route key={route.link} path={route.link} element={route.element} />
          ))}
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;