const fs = require("fs");
//Logger
let winstonLoggerWarn = require('../../../utils/winston/winstonLoggerError');

class ProductoArchivo{
    constructor(url){
        this.url = url;
        this.arregloProductos = [];
    }
    //Cargar elementos al arreglo de Productos
    async loadArray(){
        //Obtenemos la información del archivo
        if(fs.existsSync(this.url)){
            const contenido = await fs.promises.readFile(this.url,'utf-8');
            //Lo almacenamos en el arreglo de Productos
            this.arregloProductos=(JSON.parse(contenido));
        }
    }
    //Obtener todos los productos
    async getAll(){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Devolvemos el arreglo de productos
            return this.arregloProductos;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Obtener producto por Id
    async getById(id){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Obtenemos el objeto según el ID
            const productoSeleccionado = this.arregloProductos.filter((producto)=>{
                return producto.id === id;
            });
            if(!productoSeleccionado.length){
                productoSeleccionado.push({"error":"producto no encontrado"});
            } 
            //Devolvemos la respuesta
            return productoSeleccionado;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Crear/Agregar producto
    async save(data){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Obtenemos la logitud del arreglo
            const longitudArreglo = this.arregloProductos.length;
            //Si hay elementos en el arreglo obtenemos el último id y le aumentamos 1, de lo contrario el id a considerar será 1
            this.arregloProductos.length?data.id = (this.arregloProductos[longitudArreglo-1].id)+1:data.id = 1;
            //Agregamos el objeto al arreglo
            this.arregloProductos = [...this.arregloProductos,data]
            //Guardamos el arreglo actualizado en el archivo
            await fs.promises.writeFile(this.url,JSON.stringify(this.arregloProductos,"",2));
            //Devolvemos el ID creado
            return data;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Actualizar un producto según su Id
    async updateById(id,data){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Actualizadmos el nombre del producto según el Id
            const arregloProductosActualizado = this.arregloProductos.map((producto)=>{
                if(producto.id === id){
                    producto.timestamp = data.timestamp;
                    producto.nombre = data.nombre;
                    producto.descripcion = data.descripcion;
                    producto.codigo = data.codigo;
                    producto.foto = data.foto;
                    producto.precio = data.precio;
                    producto.stock = data.stock;
                }
                return producto;
            });
            //Guardamos el arreglo actualizado en el archivo
            await fs.promises.writeFile(this.url,JSON.stringify(arregloProductosActualizado,"",2));
            //Obtenemos el objeto según el ID
            const productoSeleccionado = arregloProductosActualizado.filter(producto => producto.id === id);
            //
            if(!productoSeleccionado.length){
                productoSeleccionado.push({"error":"producto no encontrado"});
            } 
            //Devolvemos el objeto con la información actualizada
            return productoSeleccionado;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Eliminar un producto según Id
    async deleteById(id){
        try {
            //Cargamos la información del arreglo
            await this.loadArray();
            //Obtenemos la cantidad inicial
            let cantidadInicial = this.arregloProductos.length;
            //Obtenemos un nuevo arreglo sin el objeto según el ID enviado
            this.arregloProductos = this.arregloProductos.filter((producto)=>{
                return producto.id !== id;
            });
            //Obtenemos la cantidad final
            let cantidadFinal = this.arregloProductos.length;
            //Comparamos
            let rpta;
            if(cantidadFinal===cantidadInicial){
                rpta = {"error":"producto no encontrado"};
            }else{
                //Guardamos el arreglo actualizado en el archivo
                await fs.promises.writeFile(this.url,JSON.stringify(this.arregloProductos,"",2));
                rpta = {"mensaje":"Registro eliminado"};
            }
            return rpta;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Eliminar todos los productos
    async deleteAll(){
        try {
            //Guardamos el arreglo vacío en el archivo
            await fs.promises.unlink(this.url);
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
}

module.exports = new ProductoArchivo("./files/productos.txt");
