const { sequelize, Sequelize, defaultOptions } = require('../db/db');

const PaysModel = sequelize
    .define('PaysModel', {
        idPays: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
        libelle: { type: Sequelize.STRING }
    }, {
        ...defaultOptions,
        tableName: 'pays',
    });

module.exports = {
    PaysModel,
};