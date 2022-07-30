import contenedorMongoDb from "../public/contenedores/contenedorMongoDb.js";

class DaoMongoDb extends contenedorMongoDb {

    constructor() {
        super('usuariosRegistrados', {
            nombre: { type: String, required: true },
            contraseña: { type: String, required: true }
        })
    }
}

export default DaoMongoDb;