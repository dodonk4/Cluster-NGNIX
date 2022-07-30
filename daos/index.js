import config from '../config.js'
let usuariosDao
switch (config.MODO_PERSISTENCIA) {
    case 'mongodb':
        const { default: DaoMongoDb } = await import('./daoMongoDb.js')
        usuariosDao = new DaoMongoDb()
        break
        
}
export { usuariosDao }