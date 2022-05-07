let winston = require('winston');
let formatLog = "File";
//
let objWinston = {
    filename: "error.log", 
    level:"error"
} 

let winstonLoggerError = winston.createLogger({
    level: "error",
    transports: [
        new winston.transports[formatLog](objWinston)
    ]
});

module.exports = winstonLoggerError;