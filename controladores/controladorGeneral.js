import { usuariosDao } from '../daos/index.js';

const controladorGeneral = {
    getRegistro: async (req, res)=>{
        res.render('inicio');
    },
    postLogin: async(req,res)=>{
        if(req.body.nombre){
           res.render('registrado', {nombre: req.body.nombre} ); 
           await usuariosDao.save(req.body);
         }
         else{
           res.send('Registro Fallado')
         }
    },
    getLogin: async (req,res)=>{
        res.render('registrado');
    },
    getLogout: async (req,res)=>{
        req.session.destroy(err => {
            if (err) {
              res.json({ status: 'Logout ERROR', body: err })
            } else {
              res.render('logout')
            }
          })
    }
}

export default controladorGeneral;

