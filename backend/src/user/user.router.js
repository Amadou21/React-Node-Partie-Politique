const { Router } = require("express");
const service = require("./user.service");
let jwt = require("jsonwebtoken");
const fs = require("fs").promises;

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

const path = "/users";

const create = async (req, res) => {
  let user = req.body;
  // console.log({ user });
  user = await service.create(user);
  if (user !== null) {
    let token = jwt.sign(user.idUser, "cHJvamV0LXJlYWN0");
    let idUser = user.idUser;
    res.status(200).json({ idUser, token });
  } else {
    res.status(401).json("Une erreur est survenu");
  }
};

const findAll = async (req, res) => {
  const users = await service.findAll();
  res.json(users);
};

const findById = async (req, res) => {
  const id = +req.params.id;
  const user = await service.findById(id);
  res.json(user);
};

const update = async (req, res) => {
  /*let user = req.body;
  const id = +req.params.id;
  user = await service.update(id, user);
  res.json(user);*/
  // console.log("req", req.files);

  // for (file of req.files) {
  //   console.log("file", file);
  // }
  try {
    let user = req.body;
    const photoUser = req.file.buffer;
    // const photoUser = await fs.readFile(file.path);
    const id = +req.params.id;
    user = { ...user, photoUser };
    console.log("user", user);
    user = await service.update(id, user);
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Une erreur inconnue est survenue." });
  }
};

const updatePhoto = async (req, res) => {
  try {
    let user = req.body;
    // console.log("user", user);
    const file = req.file;
    const photoUser = await fs.readFile(file.path);
    const id = +req.params.id;
    user = { ...user, photoUser };
    user = await service.updatePhoto(id, user);
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Une erreur inconnue est survenue." });
  }
};

const destroy = async (req, res) => {
  const id = +req.params.id;
  //const _user = await service.update(id, user);
  user = await service.destroy(id);
  res.json(user);
};

const find = async (req, res) => {
  const { email, password, remember } = req.body;
  if (remember === true) {
    var rememberTime = "8760h";
  } else {
    rememberTime = "0.05h";
  }
  user = await service.find(email, password);
  if (user === null) {
    res.status(401).json({ message: "Le login ou le mdp est incorrect" });
  } else {
    let idUser = user.idUser;
    let token = jwt.sign({ idUser }, "cHJvamV0LXJlYWN0", {
      expiresIn: rememberTime,
    });
    res.status(200).json({ idUser, token });
  }
};

const findLogin = async (req, res) => {
  const email = req.params.email;
  user = await service.findLogin(email);
  if (user == null) {
    res.status(401).json(user);
  } else {
    let token = jwt.sign({ email }, "cHJvamV0LXJlYALY");
    res.status(200).json({ token });
  }
};

const isAuth = async (req, res) => {
  try {
    const token = req.params.token;
    var user = jwt.verify(token, "cHJvamV0LXJlYWN0");
    res.status(200).json({ user });
  } catch {
    res.status(401).json({ message: "Token d'authenfication Invalide" });
  }
};

const addRoutes = (app) => {
  const router = Router();

  router.post("/", create);
  router.put("/:id", upload.single("photoUser"), update);

  router.delete("/:id", destroy);
  router.get("/:id", findById);
  router.get("/", findAll);

  router.post("/login/", find);
  router.get("/auth/:token", isAuth);
  router.get("/login/:email", findLogin);

  router.post("/:id", upload.single("photoUser"), updatePhoto);

  app.use(path, router);
};

module.exports = {
  addRoutes,
};
