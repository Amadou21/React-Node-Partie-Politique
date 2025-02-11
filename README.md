## Projet Web - React & Node.js

### 📌 Introduction

Ce projet est une application web complète développée avec React pour le frontend et Node.js avec Express pour le backend. Il repose sur une base de données SQL et implémente des fonctionnalités de gestion des utilisateurs, des membres, des bureaux, des localités, et bien plus encore.

Son objectif principal est de simuler les activités d'un parti politique, en permettant la gestion des membres, des bureaux régionaux, des mandats et des postes occupés. L'application offre une plateforme centralisée pour suivre et administrer efficacement les différentes structures du parti.


### 📂 Structure du projet

- Base_de_donne/ : Contient les scripts SQL pour l'initialisation de la base de données.

- backend/ : API backend en Node.js avec Express.

  - src/ : Contient les modèles, routeurs et services.

  - server.js : Point d'entrée du serveur.

  - db/ : Configuration de la base de données.

- frontend/ : Application React.

  - public/ : Fichiers statiques.

  -src/ : Contient les composants et fonctionnalités principales.

### 🚀 Installation et Configuration

1. Cloner le dépôt
```bash
git clone https://github.com/ton-profil/projet-web.git
cd projet-web
```
2. Installation des dépendances

Backend
```bash
cd backend
npm install
```
Frontend
```bash
cd ../frontend
npm install
```
3. Configuration de la base de données

Importer les fichiers .sql de Base_de_donne/ dans votre base de données.

Modifier la connexion à la base dans backend/src/db/db.js.

4. Lancer le projet

Démarrer le backend
```bash
cd backend
npm start
```
Démarrer le frontend
```bash
cd frontend
npm start
```
### 📊 Fonctionnalités

Gestion des utilisateurs (inscription, connexion, profils, rôles).

Gestion des membres, bureaux, localités, postes, régions, et types.

Authentification avec contexte React (AuthContext.js).

Utilisation d'Express.js et d'une base SQL pour le backend.


### 📧 Contact

Pour toute question, contactez-moi à ton.email@example.com ou via mon GitHub.
