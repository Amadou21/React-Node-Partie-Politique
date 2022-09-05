const { Router } = require("express");
const service = require("./localite.service");

const path = "/localites";

const create = async (req, res) => {
  let localite = req.body;
  console.log({ localite });
  localite = await service.create(localite);
  res.json(localite);
};

const findAll = async (req, res) => {
  const localites = await service.findAll();
  res.json(localites);
};

const findById = async (req, res) => {
  const id = +req.params.id;
  const localite = await service.findById(id);
  res.json(localite);
};

const update = async (req, res) => {
  let localite = req.body;
  const id = +req.params.id;
  localite = await service.update(id, localite);
  res.json(localite);
};

const destroy = async (req, res) => {
  const id = +req.params.id;
  localite = await service.destroy(id);
  res.json(localite);
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
