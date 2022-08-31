const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bureauRouter = require('./bureau/bureau.router');
const localiteRouter = require('./localite/localite.router');
const mandatRouter = require('./mandat/mandat.router');
const membreRouter = require('./membre/membre.router');
const paysRouter = require('./pays/pays.router');
const posteRouter = require('./poste/poste.router');
const regionRouter = require('./region/region.router');
const typeRouter = require('./type/type.router');
const userRouter = require('./user/user.router');

const routers = [

    bureauRouter,
    localiteRouter,
    mandatRouter,
    membreRouter,
    paysRouter,
    posteRouter,
    regionRouter,
    typeRouter,
    userRouter,
]

const port = 3001;

routers.forEach(router => router.addRoutes(app));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log('Server running at http://localhost:' + port)
});