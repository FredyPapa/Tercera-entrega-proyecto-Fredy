const { Router }  = require("express");
//Validación de JWT
const { validarJWT } = require('../../utils/jwt/validar-jwt');
//
const carritoArchivo  = require("./controller/carritoArchivoController");
const carritoMongoDB = require('./controller/carritoMongoDBController');
const carritoFirebase = require('./controller/carritoFirebaseController');

const apiCarrito = app =>{
    const routerArchivo = new Router();
    const routerMongoDB = new Router();
    const routerFirebase = new Router();
    
    //Archivo
    app.use("/api/carritoArchivo", routerArchivo);
    //Crea un carrito
    routerArchivo.post("/",validarJWT, carritoArchivo.carritoPost);
    //Eliminar carrito por id
    routerArchivo.delete("/:id",validarJWT, carritoArchivo.carritoDelete);
    //Listar los productos de un carrito por id
    routerArchivo.get("/:id/productos",validarJWT, carritoArchivo.carritoGetByIdProductos);
    //Agregar producto a un carrito por id
    routerArchivo.post("/:id/productos",validarJWT, carritoArchivo.carritoPostByIdProducto);
    //Eliminar producto del carrito por id
    routerArchivo.delete("/:id/productos/:id_prod",validarJWT, carritoArchivo.carritoProductoDelete);

    //MongoDB
    app.use("/api/carritoMongoDB", routerMongoDB);
    //Crea un carrito
    routerMongoDB.post("/",validarJWT, carritoMongoDB.carritoPost);
    //Eliminar carrito por id
    routerMongoDB.delete("/:id",validarJWT, carritoMongoDB.carritoDelete);
    //Listar los productos de un carrito por id
    routerMongoDB.get("/:id/productos",validarJWT, carritoMongoDB.carritoGetByIdProductos);
    //Agregar producto a un carrito por id
    routerMongoDB.post("/:id/productos",validarJWT, carritoMongoDB.carritoPostByIdProducto);
    //Eliminar producto del carrito por id
    routerMongoDB.delete("/:id/productos/:id_prod",validarJWT, carritoMongoDB.carritoProductoDelete);
    //Generar Pedido de un carrito por id
    routerMongoDB.get("/:id/pedido",validarJWT, carritoMongoDB.carritoGetByIdPedido);

    //Firebase
    app.use("/api/carritoFirebase", routerFirebase);
    //Crea un carrito
    routerFirebase.post("/",validarJWT, carritoFirebase.carritoPost);
    //Eliminar carrito por id
    routerFirebase.delete("/:id",validarJWT, carritoFirebase.carritoDelete);
    //Listar los productos de un carrito por id
    routerFirebase.get("/:id/productos",validarJWT, carritoFirebase.carritoGetByIdProductos);
    //Agregar producto a un carrito por id
    routerFirebase.post("/:id/productos",validarJWT, carritoFirebase.carritoPostByIdProducto);
    //Eliminar producto del carrito por id
    routerFirebase.delete("/:id/productos/:id_prod",validarJWT, carritoFirebase.carritoProductoDelete);
}

module.exports = {
    apiCarrito
}
