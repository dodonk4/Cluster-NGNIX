import { fork } from 'child_process';

const controladorApiRandom = {
    calcular: async (req, res) => {
        const computo = fork('./api/apiComputo.js');
        computo.on('message', async msg => {
            if (msg === 'listo') {
                computo.send(req.query.cant || 100000000);
            } else {
                res.send(`La suma es ${msg}`);
            }
        })
    }
}

export default controladorApiRandom;