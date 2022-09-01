const { Router } = require('express');
const service = require('./user.service');
let jwt = require('jsonwebtoken');

const path = '/users';

const create = async (req, res) => {
    let user = req.body;
    console.log({ user });
    user = await service.create(user);
    res.json(user);
}

const findAll = async (req, res) => {
    const users = await service.findAll();
    res.json(users);
}

const findById = async (req, res) => {
    const id = +req.params.id;
    const user = await service.findById(id);
    res.json(user);
}

const update = async (req, res) => {
    let user = req.body;
    const id = +req.params.id;
    //const _user = await service.update(id, user);
    user = await service.update(id, user);
    res.json(user);
}

const destroy = async (req, res) => {
    const id = +req.params.id;
    //const _user = await service.update(id, user);
    user = await service.destroy(id);
    res.json(user);
}

const find = async (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    user = await service.find(email, password);
    if (user === null) { res.status(401).json('refuse') }
    else {
        let token = jwt.sign({ email, password }, "cHJvamV0LXJlYWN0");
        res.status(200).json({ token })
    }
}

const isAuth = async (req, res) => {

}

const addRoutes = (app) => {
    const router = Router();
    router.post('/', create)
    router.put('/:id', update)
    router.delete('/:id', destroy)
    router.get('/:id', findById)
    router.get('/', findAll)
    router.get('/login/:email/:password', find)
    router.get('/auth/:token', find)
    app.use(path, router);
}

module.exports = {
    addRoutes
}