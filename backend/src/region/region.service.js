const { RegionModel } = require("./region.model");

const create = async (region) => {
  region = await RegionModel.create(region);
  return region;
};

const findAll = async () => {
  const regions = await RegionModel.findAll();
  return regions;
};

const findById = async (id) => {
  const region = await RegionModel.findOne({ where: { idRegion: id } });
  // console.log({ region });
  return region;
};

const update = async (id, region) => {
  await RegionModel.update(region, { where: { idRegion: id } });
};

const destroy = async (id) => {
  await RegionModel.destroy({ where: { idRegion: id } });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  destroy,
};
