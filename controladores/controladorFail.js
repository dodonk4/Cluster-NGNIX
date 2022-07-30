import flash from 'connect-flash';

const controladorFail = {
    getFailRegistro: async (req, res)=>{
        console.log(req.flash('error'));
        res.redirect('/');
    },
    getFailLogin: async (req, res)=>{
        console.log(req.flash('error'));
        res.send('Fallaste el login');
    }

}

export default controladorFail;