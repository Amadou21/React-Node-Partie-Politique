const { sequelize, Sequelize, defaultOptions } = require('../db/db');

const MembreModel = sequelize
    .define('MembreModel', {
        idMandat: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
        nom: { type: Sequelize.STRING },
        prenom: { type: Sequelize.STRING },
        photo: { type: Sequelize.BLOB },
        idBureau : { type: Sequelize.BIGINT },
        idPoste : { type: Sequelize.BIGINT },
        libellePoste : { type: Sequelize.STRING },
    }, {
        ...defaultOptions,
        tableName: 'membre',
    });

module.exports = {
    MembreModel,
};