const { sequelize, Sequelize, defaultOptions } = require('../db/db');

const PosteModel = sequelize
    .define('PosteModel', {
        idPoste: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
        libellePoste: { type: Sequelize.STRING },
    }, {
        ...defaultOptions,
        tableName: 'poste',
    });

module.exports = {
    PosteModel,
};