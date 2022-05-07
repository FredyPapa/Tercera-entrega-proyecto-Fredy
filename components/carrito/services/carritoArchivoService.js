const fs = require("fs");
//Logger
let winstonLoggerWarn = require('../../../utils/winston/winstonLoggerError');

class CarritoArchivo{
    constructor(url){
        this.url = url;
        this.arregloCarritos = [];
    }
    //Cargar elementos al arreglo de Productos
    async loadArray(){
        //Obtenemos la información del archivo
        if(fs.existsSync(this.url)){
            const contenido = await fs.promises.readFile(this.url,'utf-8');
            //Lo almacenamos en el arreglo de Productos
            this.arregloCarritos=(JSON.parse(contenido));
        }
    }
    //Crear un carrito
    async save(data){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Obtenemos la logitud del arreglo
            const longitudArreglo = this.arregloCarritos.length;
            //Si hay elementos en el arreglo obtenemos el último id y le aumentamos 1, de lo contrario el id a considerar será 1
            this.arregloCarritos.length?data.id = (this.arregloCarritos[longitudArreglo-1].id)+1:data.id = 1;
            //Agregamos el objeto al arreglo
            this.arregloCarritos = [...this.arregloCarritos,data]
            //Guardamos el arreglo actualizado en el archivo
            await fs.promises.writeFile(this.url,JSON.stringify(this.arregloCarritos,"",2));
            //Devolvemos el ID creado
            return data;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Eliminar un carrito según Id
    async deleteById(id){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Obtenemos la cantidad inicial
            let cantidadInicial = this.arregloCarritos.length;
            //Obtenemos un nuevo arreglo sin el objeto según el ID enviado
            this.arregloCarritos = this.arregloCarritos.filter((carrito)=>{
                return carrito.id !== id;
            });
            //Obtenemos la cantidad final
            let cantidadFinal = this.arregloCarritos.length;
            //Comparamos
            let rpta;
            if(cantidadFinal===cantidadInicial){
                rpta = {"error":"carrito no encontrado"};
            }else{
                //Guardamos el arreglo actualizado en el archivo
                await fs.promises.writeFile(this.url,JSON.stringify(this.arregloCarritos,"",2));
                rpta = {"mensaje":"Registro eliminado"};
            }
            return rpta;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Obtener los productos de un carrito por Id
    async getByIdProductos(id){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Obtenemos el objeto según el ID
            const carritoSeleccionado = this.arregloCarritos.filter((carrito)=>{
                return carrito.id === id;
            });
            if(!carritoSeleccionado.length){
                carritoSeleccionado.push({"error":"producto no encontrado"});
                return carritoSeleccionado;
            } else{
                //Devolvemos la respuesta
                return carritoSeleccionado[0].productos;
            }
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Agregar producto a un carrito por id
    async addProductoToCarritoById(id,data){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Añadimos el producto al carrito según el Id
            const arregloCarritosActualizado = this.arregloCarritos.map((carrito)=>{
                if(carrito.id === id){
                    carrito.productos.push(data);
                }
                return carrito;
            });
            //Guardamos el arreglo actualizado en el archivo
            await fs.promises.writeFile(this.url,JSON.stringify(arregloCarritosActualizado,"",2));
            //Obtenemos el objeto según el ID
            const carritoSeleccionado = arregloCarritosActualizado.filter(carrito => carrito.id === id);
            //
            if(!carritoSeleccionado.length){
                carritoSeleccionado.push({"error":"Carrito no encontrado"});
            } 
            //Devolvemos el objeto con la información actualizada
            return carritoSeleccionado;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Eliminar producto del carrito por id
    async deleteProductoCarritoById(id, id_prod){
        try {
            let flagCarrito = 0;
            let flagProducto = 0;
            //Cargamos la información del arreglo
            await this.loadArray();
            //Actualizamos el carrito según el Id
            const arregloCarritosActualizado = this.arregloCarritos.map((carrito)=>{
                if(carrito.id === id){
                    flagCarrito = 1;
                    const arregloProductos = carrito.productos;
                    //Obtenemos un nuevo arreglo de productos sin el producto según el id enviado
                    const arregloProductosActualizado = arregloProductos.filter((producto)=>{
                        return producto.id !== id_prod;
                    });
                    carrito.productos = arregloProductosActualizado;
                    if(arregloProductosActualizado.length<arregloProductos.length) flagProducto=1;
                }
                return carrito;
            });
            //
            let rpta;
            if(flagCarrito===0){
                rpta = {"error":"Carrito no encontrado"};
            }else if(flagProducto===0){
                rpta = {"error":"Producto no encontrado"};
            }else{
                //Guardamos el arreglo actualizado en el archivo
                await fs.promises.writeFile(this.url,JSON.stringify(arregloCarritosActualizado,"",2));
                rpta = {"mensaje":"Se eliminó el producto"};
            }
            return rpta;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }

}

module.exports = new CarritoArchivo('./files/carrito.txt');
