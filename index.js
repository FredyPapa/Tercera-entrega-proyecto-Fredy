//Importaciones de terceros
let express = require("express");
let expressSession = require('express-session')
const MongoStore = require('connect-mongo');
let cors = require("cors");
const fileUpload = require('express-fileupload');
require('dotenv').config();

//Importaciones propias del proyecto
const { serverRouter } = require("./routes");
const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

//Sesiones
app.use(expressSession({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://root:coderhouse@cursonode.o3yqn.mongodb.net/proyecto?retryWrites=true&w=majority',
        mongoOptions: {useNewUrlParser:true,useUnifiedTopology:true}
    }),
    //
    secret: "secret",
    cookie:{
        httpOnly:false,
        secure: false,
        maxAge: 1000*60*20
    },
    resave: false,
    saveUninitialized: true
}));

//Routes
serverRouter(app);

//Raíz
app.listen(PORT, ()=>{
    console.log(`Conectado a http://localhost:${PORT}`);
});
