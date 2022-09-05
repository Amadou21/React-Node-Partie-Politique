const { Router } = require("express");
const service = require("./membre.service");

const path = "/membres";

const create = async (req, res) => {
  let membre = req.body;
  console.log({ membre });
  membre = await service.create(membre);
  res.json(membre);
};

const findAll = async (req, res) => {
  const membres = await service.findAll();
  res.json(membres);
};

const findById = async (req, res) => {
  const id = +req.params.id;
  const membre = await service.findById(id);
  res.json(membre);
};

const update = async (req, res) => {
  let membre = req.body;
  const id = +req.params.id;
  membre = await service.update(id, membre);
  res.json(membre);
};

const destroy = async (req, res) => {
  const id = +req.params.id;
  membre = await service.destroy(id);
  res.json(membre);
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
