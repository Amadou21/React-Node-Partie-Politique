const { sequelize, Sequelize, defaultOptions } = require('../db/db');

const BureauModel = sequelize
    .define('BureauModel', {
        idBureau: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
        libelleBureau: { type: Sequelize.STRING },
        description : { type: Sequelize.STRING },
        idLocalite : { type: Sequelize.BIGINT },
        idType : { type: Sequelize.BIGINT },
        idTMandat : { type: Sequelize.BIGINT }
    }, {
        ...defaultOptions,
        tableName: 'bureau',
    });

module.exports = {
    BureauModel,
};