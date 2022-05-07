const { Router }  = require("express");
//
const usuario  = require("./controller/usuarioController");

const apiUsuarios = app =>{
    const router = new Router();
    app.use("/api/usuario", router);
    //Registrar usuario
    router.post("/", usuario.usuarioPost);
    //Login de usuario
    router.post("/login", usuario.loginPost);
    //Logout de usuario
    router.get("/logout", usuario.logoutGet);
}

module.exports = {
    apiUsuarios
}