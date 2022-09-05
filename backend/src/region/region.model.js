const { sequelize, Sequelize, defaultOptions } = require("../db/db");

const RegionModel = sequelize.define(
  "RegionModel",
  {
    idRegion: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    libelleRegion: { type: Sequelize.STRING },
    nbBureau: { type: Sequelize.BIGINT },
    idPays: { type: Sequelize.BIGINT },
  },
  {
    ...defaultOptions,
    tableName: "region",
  }
);

module.exports = {
  RegionModel,
};
