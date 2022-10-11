const { Router } = require("express");
const service = require("./poste.service");

const path = "/postes";

const create = async (req, res) => {
  let poste = req.body;
  // console.log({ poste });
  poste = await service.create(poste);
  res.json(poste);
};

const findAll = async (req, res) => {
  const postes = await service.findAll();
  res.json(postes);
};

const findById = async (req, res) => {
  const id = +req.params.id;
  const poste = await service.findById(id);
  res.json(poste);
};

const update = async (req, res) => {
  let poste = req.body;
  const id = +req.params.id;
  poste = await service.update(id, poste);
  res.json(poste);
};

const destroy = async (req, res) => {
  const id = +req.params.id;
  poste = await service.destroy(id);
  res.json(poste);
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
