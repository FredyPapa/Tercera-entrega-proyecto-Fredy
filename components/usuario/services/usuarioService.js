const {ObjectId} = require('mongodb');
let {connection, mongoose} = require("../../../config/databaseMongo");
let {Schema, model} = mongoose;
let {usuariosSchema} = require("../../../schemas/usuario");
let usuariosSchemaModel = new Schema(usuariosSchema);
let UsuarioModel = new model('usuarios', usuariosSchemaModel);
const bcrypt = require('bcryptjs');
let notificacion = require('../../../utils/mailer/mailer');
const { generarJWT } = require('../../../utils/jwt/generar-jwt');
//Logger
let winstonLoggerWarn = require('../../../utils/winston/winstonLoggerError');

class Usuario{
    //Registrar usuario
    async save(data){
        try {
            let new_usuario = new UsuarioModel(data);
            new_usuario.save();
            //Enviamos la notificacion
            notificacion.enviarCorreo("Nuevo registro",`<h1>Usuario creado</h1><table border='1'><tr><th>Nombre</th><th>Correo</th><th>Teléfono</th></tr><tr><td>${new_usuario.nombre}</td><td>${new_usuario.email}</td><td>${new_usuario.telefono}</td></tr></table>`);
            //Devolvemos el registro creado
            return new_usuario;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);

        }
    }

    //Login de usuario
    async login(data){
        try {
            let usuario = await UsuarioModel.findOne({"email":data.email});
            //return usuario;
            if(!usuario){
                return 0;
            }else if(usuario && bcrypt.compareSync(data.password,usuario.password)){
                // Generar el JWT
                const token = await generarJWT( usuario.id );
                //
                let usuario_rpta = {
                    "_id": ObjectId(usuario._id),
                    email: usuario.email,
                    nombre: usuario.nombre,
                    telefono: usuario.telefono,
                    foto: usuario.foto,
                    token
                }
                return usuario_rpta;
            }else{
                return 1;
            }
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
}

module.exports = new Usuario();

