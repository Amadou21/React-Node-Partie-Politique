import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accueil from "./Features/Accueil/Accueil";
import Actualites from "./Features/Accueil/Actualites";
import Projet from "./Features/Accueil/Projet";
import Connexion from "./Features/Membres/Pages/Connexion";
import Inscription from "./Features/Membres/Pages/Inscription";
import MembreActualite from "./Features/Membres/Pages/MembreActualite";
import MembreRecherche from "./Features/Membres/Pages/MembreRecherche";
import TableauDeBord from "./Features/Users/TableauDeBord";
import UserCompte from "./Features/Users/UserCompte";
import UserDetail from "./Features/Users/UserDetail";
import UserProfil from "./Features/Users/UserProfil";

const App = () => {
  const [auth, setAuth] = useState(false);

  const routes = [
    { link: "/", element: <Accueil /> },
    { link: "/projet", element: <Projet /> },
    { link: "/actualites", element: <Actualites /> },
    { link: "/connexion", element: <Connexion /> },
    { link: "/inscription", element: <Inscription /> },
  ];

  const routesMembre = [
    { link: "/connexion", element: <Connexion /> },
    { link: "/inscription", element: <Inscription /> },
    { link: "/membre-actualites", element: <MembreActualite /> },
    { link: "/membre-recherche", element: <MembreRecherche /> },
  ];

  const routesUser = [
    { link: "/compte/:id", element: <UserCompte /> },
    { link: "/tableauDeBord", element: <TableauDeBord /> },
    { link: "/userDetail/:id", element: <UserDetail /> },
    { link: "/userProfil/:id", element: <UserProfil /> },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.link} path={route.link} element={route.element} />
        ))}
        {routesMembre.map((route) => (
          <Route
            key={route.link}
            path={route.link}
            element={auth ? <MembreActualite /> : route.element}
          />
        ))}
        {routesUser.map((route) => (
          <Route
            key={route.link}
            path={route.link}
            element={auth ? <MembreActualite /> : route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
