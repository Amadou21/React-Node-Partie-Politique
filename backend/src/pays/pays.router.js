const { Router } = require("express");
const service = require("./pays.service");

const path = "/pays";

const create = async (req, res) => {
  let pays = req.body;
  console.log({ pays });
  pays = await service.create(pays);
  res.json(pays);
};

const findAll = async (req, res) => {
  const pays = await service.findAll();
  res.json(pays);
};

const findById = async (req, res) => {
  const id = +req.params.id;
  const pays = await service.findById(id);
  res.json(pays);
};

const update = async (req, res) => {
  let pays = req.body;
  const id = +req.params.id;
  pays = await service.update(id, pays);
  res.json(pays);
};

const destroy = async (req, res) => {
  const id = +req.params.id;
  pays = await service.destroy(id);
  res.json(pays);
};

const addRoutes = (app) => {
  const router = Router();

  router.post("/", create);
  router.put("/:id", update);
  router.delete("/:id", destroy);
  router.get("/:id", findById);
  router.get("/", findAll);

  app.use(path, router);
};

module.exports = {
  addRoutes,
};
