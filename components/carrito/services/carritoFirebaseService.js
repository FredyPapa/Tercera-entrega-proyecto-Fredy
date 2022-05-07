let {db:firebaseDB} = require('../../../utils/firebase');
//Logger
let winstonLoggerWarn = require('../../../utils/winston/winstonLoggerError');

class CarritoFirebase{
    //Crear un carrito
    async save(data){
        try {
            let carrito = firebaseDB.collection("carrito");
            return await carrito.doc().set(data);
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Eliminar un carrito según Id
    async deleteById(id){
        try {
            //Declaramos un arreglo vacío
            let dataFirebase = [];
            //Nos ubicamos en la colección carrito
            let carrito = firebaseDB.collection("carrito");
            //Obtenemos la data
            let res = await carrito.get();
            //Almacenamos en el arreglo
            res.forEach(element =>{
                dataFirebase.push({id: element.id, ...element.data()})
            });
            //Eliminamos
            dataFirebase.forEach(async elemento =>{
                if(elemento.id === id){
                    return await carrito.doc(elemento.id).delete();
                }
            });
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Obtener los productos de un carrito por Id
    async getByIdProductos(id){
        try {
            //Declaramos un arreglo vacío
            let dataFirebase = [];
            //Nos ubicamos en la colección carrito
            let carrito = firebaseDB.collection("carrito");
            //Obtenemos la data
            let res = await carrito.get();
            //Almacenamos en el arreglo
            res.forEach(element =>{
                dataFirebase.push({id: element.id, ...element.data()})
            });
            //Filtramos el resultado a mostrar
            let filtro = dataFirebase.filter(elemento=>elemento.id===id);
            //Devolvemos el resultado
            return filtro[0].productos;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Agregar producto a un carrito por id
    async addProductoToCarritoById(id,data){
        try {
            //Declaramos un arreglo vacío
            let dataFirebase = [];
            //Nos ubicamos en la colección carrito
            let carrito = firebaseDB.collection("carrito");
            //Obtenemos la data
            let res = await carrito.get();
            //Almacenamos en el arreglo
            res.forEach(element =>{
                dataFirebase.push({id: element.id, ...element.data()})
            });
            //Filtramos el resultado a mostrar
            let filtro = dataFirebase.filter(elemento=>elemento.id===id);
            //Obtenemos el arreglo de productos
            let arregloProductos = filtro[0].productos;
            //Le añadimos el producto nuevo
            arregloProductos.push(data);
            //console.log(arregloProductos);
            //Actualizamos
            dataFirebase.forEach(async element =>{
                if(element.id === id){
                    return await carrito.doc(element.id).update({productos:arregloProductos});
                }
            });
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Eliminar producto del carrito por id
    async deleteProductoCarritoById(id, id_prod){
        try {
            //Declaramos un arreglo vacío
            let dataFirebase = [];
            //Nos ubicamos en la colección carrito
            let carrito = firebaseDB.collection("carrito");
            //Obtenemos la data
            let res = await carrito.get();
            //Almacenamos en el arreglo
            res.forEach(element =>{
                dataFirebase.push({id: element.id, ...element.data()})
            });
            //Filtramos el resultado a mostrar
            let filtro = dataFirebase.filter(elemento=>elemento.id===id);
            //Obtenemos el arreglo de productos
            let arregloProductos = filtro[0].productos;
            //Eliminamos el producto
            arregloProductos = arregloProductos.filter(element => element.id!==id_prod);
            //console.log(arregloProductos);
            //Actualizamos
            dataFirebase.forEach(async element =>{
                if(element.id === id){
                    return await carrito.doc(element.id).update({productos:arregloProductos});
                }
            });
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
}

module.exports = new CarritoFirebase();
