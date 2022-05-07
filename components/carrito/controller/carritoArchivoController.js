const carritoArchivoService  = require("../services/carritoArchivoService");

class CarritoArchivo{
    //Crea un carrito
    async carritoPost(req,res,next){
        const now = new Date();
        const carrito = {
            timestamp: now,
            productos: req.body.productos
        };
        res.json(await carritoArchivoService.save(carrito));
    }
    //Eliminar carrito por id
    async carritoDelete(req,res,next){
        let id = parseInt(req.params.id);
        res.json(await carritoArchivoService.deleteById(id));
    }
    //Listar los productos de un carrito por id
    async carritoGetByIdProductos(req,res,next){
        const id = parseInt(req.params.id);
        res.send(await carritoArchivoService.getByIdProductos(id));
    }
    //Agregar producto a un carrito por id
    async carritoPostByIdProducto(req,res,next){
        let id = parseInt(req.params.id);
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
        res.json(await carritoArchivoService.addProductoToCarritoById(id,producto));
    }
    //Eliminar producto del carrito por id
    async carritoProductoDelete(req,res,next){
        let id = parseInt(req.params.id);
        let id_prod = parseInt(req.params.id_prod);
        res.json(await carritoArchivoService.deleteProductoCarritoById(id,id_prod));
    }
}

module.exports = new CarritoArchivo();