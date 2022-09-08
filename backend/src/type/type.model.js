const { sequelize, Sequelize, defaultOptions } = require("../db/db");

const TypeModel = sequelize.define(
  "TypeModel",
  {
    idType: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    libelleType: { type: Sequelize.STRING },
  },
  {
    ...defaultOptions,
    tableName: "type",
  }
);

module.exports = {
  TypeModel,
};
