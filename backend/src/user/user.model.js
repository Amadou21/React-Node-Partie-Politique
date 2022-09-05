const { sequelize, Sequelize, defaultOptions } = require("../db/db");

const UserModel = sequelize.define(
  "UserModel",
  {
    idUser: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    prenom: { type: Sequelize.STRING },
    nom: { type: Sequelize.STRING },
    login: { type: Sequelize.STRING },
    motDePass: { type: Sequelize.STRING },
  },
  {
    ...defaultOptions,
    tableName: "user",
  }
);

module.exports = {
  UserModel,
};
