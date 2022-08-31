const {sequelize} = require('./db');

const initDb = async () => {
    try {
        await sequelize.sync();

        console.log('DB Sync OK');
    } catch (error) {
        console.log('DB Sync KO: ', error);
        throw error;
    }
}

const pageableToOffset = ({page = 0, size = 20}) => {
    let offset = parseInt(page);
    let limit = parseInt(size);

    offset *= limit;

    return {offset, limit};
}

module.exports = {
    initDb,
    pageableToOffset,
}
