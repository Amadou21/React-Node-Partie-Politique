// const mandats = require('./mandat.data');
const { MandatModel } = require("./mandat.model");

const create = async (mandat) => {
  mandat = await MandatModel.create(mandat);
  return mandat;
};

const findAll = async () => {
  const mandats = await MandatModel.findAll();
  return mandats;
};

const findById = async (id) => {
  const mandat = await MandatModel.findOne({ where: { idMandat: id } });
  console.log({ mandat });
  return mandat;
};

const update = async (id, mandat) => {
  await MandatModel.update(mandat, { where: { idMandat: id } });
};

const destroy = async (id) => {
  await MandatModel.destroy({ where: { idMandat: id } });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  destroy,
};
