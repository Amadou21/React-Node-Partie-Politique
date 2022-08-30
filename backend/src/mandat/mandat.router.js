const { Router } = require('express');
const service = require('./mandat.service');


const path = '/mandats';

const create = async (req, res) => {
    let mandat = req.body;
    console.log({ mandat });
    mandat = await service.create(mandat);
    res.json(mandat);
}

const findAll = async (req, res) => {
    const mandats = await service.findAll();
    res.json(mandats);
}

const findById = async (req, res) => {
    const id = +req.params.id;
    const mandat = await service.findById(id);
    res.json(mandat);
}

const update = async (req, res) => {
    let mandat = req.body;
    const id = +req.params.id;
    mandat = await service.update(id, mandat);
    res.json(mandat);
}

const destroy = async (req, res) => {
    const id = +req.params.id;
    mandat = await service.destroy(id);
    res.json(mandat);
}

const addRoutes = (app) => {
    const router = Router();

    router.post('/', create)
    router.put('/:id', update)
    router.delete('/:id', destroy)
    router.get('/:id', findById)
    router.get('/', findAll)

    app.use(path, router);
}

module.exports = {
    addRoutes
}