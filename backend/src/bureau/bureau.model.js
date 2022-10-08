const { sequelize, Sequelize, defaultOptions } = require("../db/db");

const BureauModel = sequelize.define(
  "BureauModel",
  {
    idBureau: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    libelleBureau: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    // -----------------------------------------------------------
    photoBureau: { type: Sequelize.BLOB("long") },
    // -----------------------------------------------------------
    idLocalite: { type: Sequelize.BIGINT },
    idType: { type: Sequelize.BIGINT },
    idMandat: { type: Sequelize.BIGINT },
    idPays: { type: Sequelize.BIGINT },
  },
  {
    ...defaultOptions,
    tableName: "bureau",
  }
);

module.exports = {
  BureauModel,
};
