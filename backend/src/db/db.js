const Sequelize = require("sequelize");

const dbConfig = {
  HOST: "localhost",
  PORT: "3306",
  USER: "root",
  PASSWORD: "",
  DB: "loga_parti",
  dialect: "mysql",
  showSql: "false",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: "0",
  pool: dbConfig.pool,
  logging: (sql) => dbConfig.showSql && console.log(sql),
});

module.exports = {
  Sequelize,
  sequelize,
  dbConfig,
  defaultOptions: {
    timestamps: false,
    underscored: true,
  },
};
