const {ObjectId} = require('mongodb');
let {connection, mongoose} = require("../../../config/databaseMongo");
let {Schema, model} = mongoose;
let {carritosSchema} = require("../../../schemas/carrito");
let carritosSchemaModel = new Schema(carritosSchema);
let CarritoModel = new model('carrito', carritosSchemaModel);
let notificacion = require('../../../utils/mailer/mailer');
//Logger
let winstonLoggerWarn = require('../../../utils/winston/winstonLoggerError');

class CarritoMongoDB{
    //Crear un carrito
    async save(data){
        try {
            let new_carrito = new CarritoModel(data);
            new_carrito.save();
            return new_carrito;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Eliminar un carrito según Id
    async deleteById(id){
        try {
            return await CarritoModel.deleteOne({"_id": ObjectId(id)});
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Obtener los productos de un carrito por Id
    async getByIdProductos(id){
        try {
            let productos = await CarritoModel.findOne({"_id": ObjectId(id)},{productos:1,_id:0});
            return productos;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Agregar producto a un carrito por id
    async addProductoToCarritoById(id,data){
        try {
            return await CarritoModel.findOneAndUpdate({"_id": ObjectId(id)},{$push:{productos:data}});
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Eliminar producto del carrito por id
    async deleteProductoCarritoById(id, id_prod){
        try {
            let {productos} = await CarritoModel.findOne({"_id": ObjectId(id)},{productos:1,_id:0});
            productos = productos.filter((producto)=>{
                return producto.id !== id_prod;
            });
            return await CarritoModel.findOneAndUpdate({"_id": ObjectId(id)},{$set:{productos:productos}});
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Generar Pedido de un carrito por id
    async carritoGetByIdPedido(id){
        try {
            let productos = await CarritoModel.findOne({"_id": ObjectId(id)},{productos:1,_id:0});
            //Enviamos la notificacion
            notificacion.enviarCorreo("Nuevo pedido",`Detalle del pedido ${productos}`);
            return productos;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
}

module.exports = new CarritoMongoDB();
