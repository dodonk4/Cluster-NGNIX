import { usuariosDao } from '../daos/index.js';

const controladoresUsuarios = {
    getAll: async (req, res) => {
        res.json(await usuariosDao.getAll());
    },
    create: async(req, res) => {
        res.json(await usuariosDao.save(req.body));
    }
}

export default controladoresUsuarios;