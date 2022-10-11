const { Router } = require("express");
const service = require("./bureau.service");

const path = "/bureaux";

const create = async (req, res) => {
  let bureau = req.body;
  // console.log({ bureau });
  bureau = await service.create(bureau);
  res.json(bureau);
};

const findAll = async (req, res) => {
  const bureaux = await service.findAll();
  res.json(bureaux);
};

const findById = async (req, res) => {
  const id = +req.params.id;
  const bureau = await service.findById(id);
  res.json(bureau);
};
const findByIdPays = async (req, res) => {
  const id = +req.params.id;
  const bureau = await service.findByIdPays(id);
  res.json(bureau);
};
const findByIdLocalite = async (req, res) => {
  const id = +req.params.id;
  const bureau = await service.findByIdLocalite(id);
  res.json(bureau);
};

const update = async (req, res) => {
  let bureau = req.body;
  const id = +req.params.id;
  bureau = await service.update(id, bureau);
  res.json(bureau);
};

const destroy = async (req, res) => {
  const id = +req.params.id;
  bureau = await service.destroy(id);
  res.json(bureau);
};

const addRoutes = (app) => {
  const router = Router();

  router.post("/", create);
  router.put("/:id", update);
  router.delete("/:id", destroy);
  router.get("/:id", findById);
  router.get("/:idPays", findByIdPays);
  router.get("/:idLocalite", findByIdLocalite);
  router.get("/", findAll);

  app.use(path, router);
};

module.exports = {
  addRoutes,
};
