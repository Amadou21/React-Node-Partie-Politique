const { sequelize, Sequelize, defaultOptions } = require('../db/db');

const ClientModel = sequelize
    .define('UserModel', {
        idUser: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        login: { type: Sequelize.STRING },
        motDePasse : { type: Sequelize.STRING }
    }, {
        ...defaultOptions,
        tableName: 'user',
    });

module.exports = {
    ClientModel,
};