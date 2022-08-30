const { MembreModel } = require('./membre.model');

const create = async (membre) => {
    membre = await MembreModel.create(membre);
    return membre;
}

const findAll = async () => {
    const membres = await MembreModel.findAll();
    return membres;
}

const findById = async (id) => {
    const membre = await MembreModel.findOne({ where: { idMembre:id } });
    console.log({ membre });
    return membre;
}

const update = async (id, membre) => {
    await MembreModel.update(membre, { where: { idMembre: id } });
}

const destroy = async (id) => {
    await MembreModel.destroy({ where: { idMembre: id } });
}


module.exports = {
    findAll, findById, create, update, destroy
}
