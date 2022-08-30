import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Accueil from './Features/Accueil/Accueil'
import Actualites from './Features/Accueil/Actualites';
import Projet from './Features/Accueil/Projet';
import Connexion from './Features/Membres/Connexion';
import Inscription from './Features/Membres/Inscription';
import MembreActualite from './Features/Membres/MembreActualite';
import MembreRecherche from './Features/Membres/MembreRecherche';

const App = () => {

  const routes = [
    { link: '/', element: <Accueil /> },
    { link: '/projet', element: <Projet /> },
    { link: '/actualites', element: <Actualites /> },
    { link: '/connexion', element: <Connexion /> },
    { link: '/inscription', element: <Inscription /> },
    /*{ link: '/membre-actualites', element: <MembreActualite /> },
    { link: '/membre-recherche', element: <MembreRecherche /> }*/
  ]

  const routesMembre = [
    { link: '/membre-actualites', element: <MembreActualite /> },
    { link: '/membre-recherche', element: <MembreRecherche /> },
  ]

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route => (
          <Route key={route.link} path={route.link} element={route.element} />
        ))}

        {routesMembre.map(route => (
          <Route key={route.link} path={route.link} element={route.element} />
        ))}

      </Routes>
    </BrowserRouter>
  );
};

export default App;