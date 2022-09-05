const { sequelize, Sequelize, defaultOptions } = require("../db/db");

const LocaliteModel = sequelize.define(
  "LocaliteModel",
  {
    idLocalite: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    libelleLocalite: { type: Sequelize.STRING },
    latitude: { type: Sequelize.STRING },
    longitude: { type: Sequelize.BIGINT },
    idRegion: { type: Sequelize.BIGINT },
  },
  {
    ...defaultOptions,
    tableName: "localite",
  }
);

module.exports = {
  LocaliteModel,
};
