// const localites = require('./localite.data');
const { LocaliteModel } = require("./localite.model");

const create = async (localite) => {
  localite = await LocaliteModel.create(localite);
  return localite;
};

const findAll = async () => {
  const localites = await LocaliteModel.findAll();
  return localites;
};

const findById = async (id) => {
  const localite = await LocaliteModel.findOne({ where: { idLocalite: id } });
  console.log({ localite });
  return localite;
};

const update = async (id, localite) => {
  await LocaliteModel.update(localite, { where: { idLocalite: id } });
};

const destroy = async (id) => {
  await LocaliteModel.destroy({ where: { idLocalite: id } });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  destroy,
};
