const { apiProductos } = require("../components/producto");
const { apiCarrito } = require("../components/carrito");
const { apiUsuarios } = require("../components/usuario");
//Logger
let winstonLoggerWarn = require('../utils/winston/winstonLoggerWarn');

const serverRouter = app =>{
    apiProductos(app);
    apiCarrito(app);
    apiUsuarios(app);
    //
    app.get("*",(req,res,next)=>{
        const ruta = req.baseUrl + req.path;
        winstonLoggerWarn.warn(`La ruta ${ruta} no fue implementada`);
        res.json({"error": -2, "descripcion":`Ruta ${ruta} no implementada`});
    });
}

module.exports = {
    serverRouter
}