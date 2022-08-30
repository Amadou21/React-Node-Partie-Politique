// const payss = require('./pays.data');
const { PaysModel } = require('./pays.model');

const create = async (pays) => {
    pays = await PaysModel.create(pays);
    return pays;
}

const findAll = async () => {
    const pays = await PaysModel.findAll();
    return pays;
}

const findById = async (id) => {
    const pays = await PaysModel.findOne({ where: { idPays:id } });
    console.log({ pays });
    return pays;
}

const update = async (id, pays) => {
    await PaysModel.update(pays, { where: { idPays: id } });
}

const destroy = async (id) => {
    await PaysModel.destroy({ where: { idPays: id } });
}


module.exports = {
    findAll, findById, create, update, destroy
}
