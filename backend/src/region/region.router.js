const { Router } = require('express');
const service = require('./region.service');


const path = '/regions';

const create = async (req, res) => {
    let region = req.body;
    console.log({ region });
    region = await service.create(region);
    res.json(region);
}

const findAll = async (req, res) => {
    const regions = await service.findAll();
    res.json(regions);
}

const findById = async (req, res) => {
    const id = +req.params.id;
    const region = await service.findById(id);
    res.json(region);
}

const update = async (req, res) => {
    let region = req.body;
    const id = +req.params.id;
    region = await service.update(id, region);
    res.json(region);
}

const destroy = async (req, res) => {
    const id = +req.params.id;
    region = await service.destroy(id);
    res.json(region);
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