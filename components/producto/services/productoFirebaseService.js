let {db:firebaseDB} = require('../../../utils/firebase');
//Logger
let winstonLoggerWarn = require('../../../utils/winston/winstonLoggerError');

class ProductoFirebase{
    //Obtener todos los productos
    async getAll(){
        try {
            //Declaramos un arreglo vacío
            let dataFirebase = [];
            //Nos ubicamos en la colección productos
            let productos = firebaseDB.collection("productos");
            //Obtenemos la data
            let res = await productos.get();
            //Almacenamos en el arreglo
            res.forEach(element =>{
                dataFirebase.push({id: element.id, ...element.data()})
            });
            //Devolvemos el resultado
            return dataFirebase;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Obtener producto por Id
    async getById(id){
        try {
            //Declaramos un arreglo vacío
            let dataFirebase = [];
            //Nos ubicamos en la colección productos
            let productos = firebaseDB.collection("productos");
            //Obtenemos la data
            let res = await productos.get();
            //Almacenamos en el arreglo
            res.forEach(element =>{
                dataFirebase.push({id: element.id, ...element.data()})
            });
            //Filtramos el resultado a mostrar
            let producto = dataFirebase.filter(producto=>producto.id===id);
            //Devolvemos el resultado
            return producto;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Crear/Agregar producto
    async save(data){
        try {
            let productos = firebaseDB.collection("productos");
            return await productos.doc().set(data);
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Actualizar un producto según su Id
    async updateById(id,data){
        try {
            //Declaramos un arreglo vacío
            let dataFirebase = [];
            //Nos ubicamos en la colección productos
            let productos = firebaseDB.collection("productos");
            //Obtenemos la data
            let res = await productos.get();
            //Almacenamos en el arreglo
            res.forEach(element =>{
                dataFirebase.push({id: element.id, ...element.data()})
            });
            //Actualizamos
            dataFirebase.forEach(async producto =>{
                if(producto.id === id){
                    return await productos.doc(producto.id).update({timestamp:data.timestamp,nombre:data.nombre,descripcion:data.descripcion,codigo:data.codigo,foto:data.foto,precio:data.precio,stock:data.stock});
                }
            });
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Eliminar un producto según Id
    async deleteById(id){
        try {
            //Declaramos un arreglo vacío
            let dataFirebase = [];
            //Nos ubicamos en la colección productos
            let productos = firebaseDB.collection("productos");
            //Obtenemos la data
            let res = await productos.get();
            //Almacenamos en el arreglo
            res.forEach(element =>{
                dataFirebase.push({id: element.id, ...element.data()})
            });
            //Eliminamos
            dataFirebase.forEach(async producto =>{
                if(producto.id === id){
                    return await productos.doc(producto.id).delete();
                }
            });
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
}

module.exports = new ProductoFirebase();
