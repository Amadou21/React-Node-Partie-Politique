const { TypeModel } = require('./type.model');

const create = async (type) => {
    type = await TypeModel.create(type);
    return type;
}

const findAll = async () => {
    const types = await TypeModel.findAll();
    return types;
}

const findById = async (id) => {
    const type = await TypeModel.findOne({ where: { idType:id } });
    console.log({ type });
    return type;
}

const update = async (id, type) => {
    await TypeModel.update(type, { where: { idType: id } });
}

const destroy = async (id) => {
    await TypeModel.destroy({ where: { idType: id } });
}


module.exports = {
    findAll, findById, create, update, destroy
}
