import Contenedor from '../public/contenedores/productos.js';
import Mensajeria from '../public/contenedores/mensajes.js';
import util from 'util';
import path from 'path';
import os from 'os'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caja = new Contenedor();
const mensajeriaANormalizar = new Mensajeria('./public/texto/mensajesANormalizar.txt');

const controladorComplejo = {
    getInicio: async (req, res)=>{
        console.log(await caja.obtenerTodos());
        if (req.session.passport) {
            await caja.crearTabla();
            await caja.obtenerTodos();
            let productos = await caja.obtenerTodos();
            let mensajes = await mensajeriaANormalizar.obtenerTodos();
            res.render('logueado', { titulo: 'PRODUCTO', titulo2: 'PRECIO', titulo3: 'THUMBNAIL', productos, mensajes, nombre: req.session.passport.user.nombre});
        } else {
            res.render('redireccion');
        }
    },
    postInicio: async (req, res)=>{
        req.session.user = req.body.nombre;
        req.session.password = req.body.contraseña;
        req.session.cookie.maxAge = 60000;
        await caja.obtenerTodos();
        let productos = await caja.obtenerTodos();
        let mensajes = await mensajeriaANormalizar.obtenerTodos();
        res.render('logueado', { titulo: 'PRODUCTO', titulo2: 'PRECIO', titulo3: 'THUMBNAIL', productos, mensajes, nombre: req.session.passport.user.nombre});
    
    },
    getInfo: async (req, res)=>{
            function print(objeto) {
                return util.inspect(objeto, true, 0, false);
              }
            let cosa = Object.entries(process.memoryUsage());
            let cosa2 = JSON.stringify(cosa[0]);
            let newCosa = cosa2.replace('"rss",', '').replace('[', '').replace(']', '');
            res.send(`Path de ejecución: ${path.join(__dirname, '/server.js')}<br>
            Carpeta del proyecto: ${process.cwd()}<br>
            Process ID: ${process.pid}<br>
            Version de Node.js: ${process.version}<br>
            Título del proceso: ${process.title}<br>
            Sistema operativo: ${process.platform}<br>
            Memoria reservada: ${newCosa}<br>
            Argumentos de Entrada: ${process.argv.slice(2)}<br>
            Numero de procesadores: ${os.cpus().length}`);
            
        }
    }


export default controladorComplejo;
