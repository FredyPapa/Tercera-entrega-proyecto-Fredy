const productoMongoDBService  = require("../services/productoMongoDBService");
//Flag de administrador
const administrador = true;

class ProductoMongoDB{
    //Listar todos los productos
    async productosGet(req,res,next){
        res.send(await productoMongoDBService.getAll());
    }

    //Listar un producto por id
    async productoGetById(req,res,next){
        const {params: {id}} = req;
        res.send(await productoMongoDBService.getById(id));
    }

    //Agregar producto
    async productoPost(req,res,next){
        if(administrador){
            const now = new Date();
            const producto = {
                timestamp: now,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                codigo: req.body.codigo,
                foto: req.body.foto,
                precio: req.body.precio,
                stock: req.body.stock
            };
            res.json(await productoMongoDBService.save(producto));
        }else{
            const ruta = req.baseUrl + req.path;
            res.json({"error": -1, "descripcion":`Ruta ${ruta} no autorizada`});
        }
    }

    //Actualizar producto
    async productoUpdate(req,res,next){
        if(administrador){
            const now = new Date();
            const {params: {id}} = req;
            const producto = {
                timestamp: now,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                codigo: req.body.codigo,
                foto: req.body.foto,
                precio: req.body.precio,
                stock: req.body.stock
            };
            res.json(await productoMongoDBService.updateById(id,producto));
        }else{
            const ruta = req.baseUrl + req.path;
            res.json({"error": -1, "descripcion":`Ruta ${ruta} no autorizada`});
        }
    }

    //Eliminar producto por id
    async productoDelete(req,res,next){
        if(administrador){
            const {params: {id}} = req;
            res.json(await productoMongoDBService.deleteById(id));
        }else{
            const ruta = req.baseUrl + req.path;
            res.json({"error": -1, "descripcion":`Ruta ${ruta} no autorizada`});
        }
    }
}

module.exports = new ProductoMongoDB();
