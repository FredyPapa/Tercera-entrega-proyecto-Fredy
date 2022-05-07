const carritoFirebaseService  = require("../services/carritoFirebaseService");

class CarritoFirebase{
    //Crea un carrito
    async carritoPost(req,res,next){
        const now = new Date();
        const carrito = {
            timestamp: now,
            productos: req.body.productos
        };
        res.json(await carritoFirebaseService.save(carrito));
    }
    //Eliminar carrito por id
    async carritoDelete(req,res,next){
        const {params: {id}} = req;
        res.json(await carritoFirebaseService.deleteById(id));
    }
    //Listar los productos de un carrito por id
    async carritoGetByIdProductos(req,res,next){
        const {params: {id}} = req;
        res.send(await carritoFirebaseService.getByIdProductos(id));
    }
    //Agregar producto a un carrito por id
    async carritoPostByIdProducto(req,res,next){
        const {params: {id}} = req;
        const producto = {
            id: req.body.id,
            timestamp: req.body.timestamp,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            foto: req.body.foto,
            precio: req.body.precio,
            stock: req.body.stock
        };
        res.json(await carritoFirebaseService.addProductoToCarritoById(id,producto));
    }
    //Eliminar producto del carrito por id
    async carritoProductoDelete(req,res,next){
        const {params: {id}} = req;
        const {params: {id_prod}} = req;
        res.json(await carritoFirebaseService.deleteProductoCarritoById(id,id_prod));
    }
}

module.exports = new CarritoFirebase();