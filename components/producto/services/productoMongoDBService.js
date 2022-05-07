const {ObjectId} = require('mongodb');
let {connection, mongoose} = require("../../../config/databaseMongo");
let {Schema, model} = mongoose;
let {productosSchema} = require("../../../schemas/producto");
let productosSchemaModel = new Schema(productosSchema);
let ProductoModel = new model('productos', productosSchemaModel);
//Logger
let winstonLoggerWarn = require('../../../utils/winston/winstonLoggerError');

class ProductoMongoDB{
    //Obtener todos los productos
    async getAll(){
        try {
            let productos = await ProductoModel.find();
            return productos;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Obtener producto por Id
    async getById(id){
        try {
            let producto = await ProductoModel.findOne({"_id": ObjectId(id)});
            return producto;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Crear/Agregar producto
    async save(data){
        try {
            let new_producto = new ProductoModel(data);
            new_producto.save();
            return new_producto;
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Actualizar un producto según su Id
    async updateById(id,data){
        try {
            return await ProductoModel.findOneAndUpdate({"_id": ObjectId(id)},{$set:{timestamp:data.timestamp,nombre:data.nombre,descripcion:data.descripcion,codigo:data.codigo,foto:data.foto,precio:data.precio,stock:data.stock}});
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
    //Eliminar un producto según Id
    async deleteById(id){
        try {
            return await ProductoModel.deleteOne({"_id": ObjectId(id)});
        } catch (error) {
            //console.log(error);
            winstonLoggerWarn.error("Error presentado: "+error);
        }
    }
}

module.exports = new ProductoMongoDB();
