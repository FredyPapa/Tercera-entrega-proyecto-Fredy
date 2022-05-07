const productoFirebaseService  = require("../services/productoFirebaseService");
//Flag de administrador
const administrador = true;

class ProductoFirebase{
    //Listar todos los productos
    async productosGet(req,res,next){
        res.send(await productoFirebaseService.getAll());
    }

    //Listar un producto por id
    async productoGetById(req,res,next){
        const {params: {id}} = req;
        res.send(await productoFirebaseService.getById(id));
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
            res.json(await productoFirebaseService.save(producto));
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
            res.json(await productoFirebaseService.updateById(id,producto));
        }else{
            const ruta = req.baseUrl + req.path;
            res.json({"error": -1, "descripcion":`Ruta ${ruta} no autorizada`});
        }
    }

    //Eliminar producto por id
    async productoDelete(req,res,next){
        if(administrador){
            const {params: {id}} = req;
            res.json(await productoFirebaseService.deleteById(id));
        }else{
            const ruta = req.baseUrl + req.path;
            res.json({"error": -1, "descripcion":`Ruta ${ruta} no autorizada`});
        }
    }
}

module.exports = new ProductoFirebase();
