let winston = require('winston');
let formatLog = "File";
//
let objWinston = {
    filename: "warn.log", 
    level:"warn"
} 

let winstonLoggerWarn = winston.createLogger({
    level: "warn",
    transports: [
        new winston.transports[formatLog](objWinston)
    ]
});

module.exports = winstonLoggerWarn;