const productoArchivoService  = require("../services/productoArchivoService");
//Flag de administrador
const administrador = true;

class ProductoArchivo{
    //Listar todos los productos
    async productosGet(req,res,next){
        res.send(await productoArchivoService.getAll());
    }

    //Listar un producto por id
    async productoGetById(req,res,next){
        const id = parseInt(req.params.id);
        res.send(await productoArchivoService.getById(id));
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
            res.json(await productoArchivoService.save(producto));
        }else{
            const ruta = req.baseUrl + req.path;
            res.json({"error": -1, "descripcion":`Ruta ${ruta} no autorizada`});
        }
    }

    //Actualizar producto
    async productoUpdate(req,res,next){
        if(administrador){
            const now = new Date();
            const id = parseInt(req.params.id);
            const producto = {
                timestamp: now,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                codigo: req.body.codigo,
                foto: req.body.foto,
                precio: req.body.precio,
                stock: req.body.stock
            };
            res.json(await productoArchivoService.updateById(id,producto));
        }else{
            const ruta = req.baseUrl + req.path;
            res.json({"error": -1, "descripcion":`Ruta ${ruta} no autorizada`});
        }
    }

    //Eliminar producto por id
    async productoDelete(req,res,next){
        if(administrador){
            let id = parseInt(req.params.id);
            res.json(await productoArchivoService.deleteById(id));
        }else{
            const ruta = req.baseUrl + req.path;
            res.json({"error": -1, "descripcion":`Ruta ${ruta} no autorizada`});
        }
    }
}

module.exports = new ProductoArchivo();
