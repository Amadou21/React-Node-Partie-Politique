// const bureaux = require('./bureau.data');
const { BureauModel } = require("./bureau.model");

const create = async (bureau) => {
  bureau = await BureauModel.create(bureau);
  return bureau;
};

const findAll = async () => {
  const bureaux = await BureauModel.findAll();
  return bureaux;
};

const findById = async (id) => {
  const bureau = await BureauModel.findOne({ where: { idBureau: id } });
  console.log({ bureau });
  return bureau;
};
const findByIdPays = async (idPays) => {
  const bureau = await BureauModel.findOne({ where: { idPays } });
  console.log({ bureau });
  return bureau;
};
const findByIdLocalite = async (idLocalite) => {
  const bureau = await BureauModel.findOne({ where: { idLocalite } });
  console.log({ bureau });
  return bureau;
};

const update = async (id, bureau) => {
  await BureauModel.update(bureau, { where: { idBureau: id } });
};

const destroy = async (id) => {
  await BureauModel.destroy({ where: { idBureau: id } });
};

const findByType = async (type) => {
  const bureaux = await BureauModel.findAll({ where: { idType: type } });
  console.log({ bureaux });
  return bureaux;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  destroy,
  findByType,
  findByIdLocalite,
  findByIdPays,
};
