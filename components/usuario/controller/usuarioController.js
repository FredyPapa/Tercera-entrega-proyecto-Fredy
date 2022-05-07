const usuarioService  = require("../services/usuarioService");
const bcrypt = require('bcryptjs');

class Usuario{
    //Registrar usuario
    async usuarioPost(req,res,next){
        const now = new Date();
        const usuario = {
            timestamp: now,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            edad: req.body.edad,
            telefono: req.body.telefono,
            foto: req.body.foto
        };
        res.json(await usuarioService.save(usuario));
    }
    //Login de usuario
    async loginPost(req,res,next){
        const usuarioLogin = {
            email: req.body.email,
            password: req.body.password
        };
        let logueo = await usuarioService.login(usuarioLogin);
        console.log(logueo);
        if(logueo != null){
            if(logueo == 0){
                console.log("No existe el usuario");
                res.status(404).send({idMessage: "0", message:"No existe este usuario"});
                //res.render("../noExisteUsuario", {});
            }else if(logueo==1){
                console.log("Logueo incorrecto");
                res.status(400).send({idMessage:"1", message:"Contraseña incorrecta"});
                //res.render("../credencialesNoSonCorrectas", {});
            }else{
                console.log("Logueo correcto");
                req.session.idUsuario = logueo._id;
                req.session.nombre = logueo.nombre;
                req.session.email = logueo.email;
                req.session.telefono = logueo.telefono;
                req.session.foto = logueo.foto;
                //console.log("---------------------F--------------------");
                //console.log(req.session.nombre);
                res.status(200).send({idMessage:"2", data:logueo});
                //res.render("../index", {data:await contenedor.getAll(),nombre:user.name, correo:user.email});
            }
        }else{
            console.log("Error interno del servidor");
            res.status(500).send({idMessage:"3", message:"Error interno del servidor"});
        }
    }

    //Logout de usuario
    async logoutGet(req,res,next){
        let usuarioNombre = req.session.nombre;
        req.session.destroy(err=>{
            if(err) res.send(JSON.stringify(err));
            res.status(200).send({message:`Usuario ${usuarioNombre} deslogueado`});
            //res.render("../logout",{nombre:nombreUsuario});
        });
    }
}

module.exports = new Usuario();
