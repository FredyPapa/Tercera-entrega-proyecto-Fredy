const { Router }  = require("express");
//Validación de JWT
const { validarJWT } = require('../../utils/jwt/validar-jwt');
//
const productoArchivo  = require("./controller/productoArchivoController");
const productoMongoDB = require('./controller/productoMongoDBController');
const productoFirebase = require('./controller/productoFirebaseController');

const apiProductos = app =>{
    const routerArchivo = new Router();
    const routerMongoDB = new Router();
    const routerFirebase = new Router();

    //Archivo
    app.use("/api/productosArchivo", routerArchivo);
    //Listar todos los productos
    routerArchivo.get("/",validarJWT,productoArchivo.productosGet);
    //Listar un producto por id
    routerArchivo.get("/:id",validarJWT, productoArchivo.productoGetById);
    //Agregar producto
    routerArchivo.post("/",validarJWT, productoArchivo.productoPost);
    //Actualizar producto por id
    routerArchivo.put("/:id",validarJWT, productoArchivo.productoUpdate);
    //Eliminar producto por id
    routerArchivo.delete("/:id",validarJWT, productoArchivo.productoDelete);

    //MongoDB
    app.use("/api/productosMongoDB", routerMongoDB);
    //Listar todos los productos
    routerMongoDB.get("/",validarJWT,productoMongoDB.productosGet);
    //Listar un producto por id
    routerMongoDB.get("/:id",validarJWT, productoMongoDB.productoGetById);
    //Agregar producto
    routerMongoDB.post("/",validarJWT, productoMongoDB.productoPost);
    //Actualizar producto por id
    routerMongoDB.put("/:id",validarJWT, productoMongoDB.productoUpdate);
    //Eliminar producto por id
    routerMongoDB.delete("/:id",validarJWT, productoMongoDB.productoDelete);
    
    
    //Firebase
    app.use("/api/productosFirebase", routerFirebase);
    //Listar todos los productos
    routerFirebase.get("/",validarJWT,productoFirebase.productosGet);
    //Listar un producto por id
    routerFirebase.get("/:id",validarJWT, productoFirebase.productoGetById);
    //Agregar producto
    routerFirebase.post("/",validarJWT, productoFirebase.productoPost);
    //Actualizar producto por id
    routerFirebase.put("/:id",validarJWT, productoFirebase.productoUpdate);
    //Eliminar producto por id
    routerFirebase.delete("/:id",validarJWT, productoFirebase.productoDelete);
    
}

module.exports = {
    apiProductos
}