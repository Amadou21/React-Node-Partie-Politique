const { PosteModel } = require('./poste.model');

const create = async (poste) => {
    poste = await PosteModel.create(poste);
    return poste;
}

const findAll = async () => {
    const postes = await PosteModel.findAll();
    return postes;
}

const findById = async (id) => {
    const poste = await PosteModel.findOne({ where: { idPoste:id } });
    console.log({ poste });
    return poste;
}

const update = async (id, poste) => {
    await PosteModel.update(poste, { where: { idPoste: id } });
}

const destroy = async (id) => {
    await PosteModel.destroy({ where: { idPoste: id } });
}


module.exports = {
    findAll, findById, create, update, destroy
}
