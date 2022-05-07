let winston = require('winston');
let formatLog = "Console";
//
let objWinston = {
    level:"info"
} 

let winstonLoggerInfo = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports[formatLog](objWinston)
    ]
});

module.exports = winstonLoggerInfo;