const { sequelize, Sequelize, defaultOptions } = require("../db/db");

const MandatModel = sequelize.define(
  "MandatModel",
  {
    idMandat: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    debut: { type: Sequelize.DATE },
    fin: { type: Sequelize.DATE },
  },
  {
    ...defaultOptions,
    tableName: "mandat",
  }
);

module.exports = {
  MandatModel,
};
