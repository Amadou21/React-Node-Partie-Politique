const { Router } = require("express");
const service = require("./type.service");

const path = "/type";

const create = async (req, res) => {
  let type = req.body;
  // console.log({ type });
  type = await service.create(type);
  res.json(type);
};

const findAll = async (req, res) => {
  const types = await service.findAll();
  res.json(types);
};

const findById = async (req, res) => {
  const id = +req.params.id;
  const type = await service.findById(id);
  res.json(type);
};

const update = async (req, res) => {
  let type = req.body;
  const id = +req.params.id;
  type = await service.update(id, type);
  res.json(type);
};

const destroy = async (req, res) => {
  const id = +req.params.id;
  type = await service.destroy(id);
  res.json(type);
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
