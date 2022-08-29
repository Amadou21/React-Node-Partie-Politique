import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Accueil from "./Features/Accueil/Accueil";
import Actualites from "./Features/Accueil/Actualites";
import Projet from "./Features/Accueil/Projet";
import AppLayout from "./Features/Layout/AppLayout";
import Connexion from "./Features/Membres/Connexion";
import MembreActualite from "./Features/Membres/MembreActualite";
import MembreRecherche from "./Features/Membres/MembreRecherche";
import TableauDeBord from "./Features/Users/TableauDeBord";
import UserCompte from "./Features/Users/UserCompte";
import UserDetail from "./Features/Users/UserDetail";

const App = () => {
  const routes = [
    { link: "/", element: <Accueil /> },
    { link: "/projet", element: <Projet /> },
    { link: "/actualites", element: <Actualites /> },
    { link: "/connexion", element: <Connexion /> },
    { link: "/membre-actualites", element: <MembreActualite /> },
    { link: "/membre-recherche", element: <MembreRecherche /> },

    { link: "/compte/:id", element: <UserCompte /> },
    { link: "/tableauDeBord", element: <TableauDeBord /> },
    { link: "/userDetail/:id", element: <UserDetail /> },
  ];

  const routesMembre = [
    { link: "/membre-actualites", element: <MembreActualite /> },
    { link: "/membre-recherche", element: <MembreRecherche /> },
  ];

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {routes.map((route) => (
            <Route key={route.link} path={route.link} element={route.element} />
          ))}

          {routesMembre.map((route) => (
            <Route key={route.link} path={route.link} element={route.element} />
          ))}
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
