import winston from 'winston'
import config from './config/config.js'


const customeLevelOptions = {
    levels: {
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5  
    },
    colors:{
        fatal: 'red',
        error: 'yellow',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
}

export let logger

if(config.enviroment === 'prod'){
    logger = winston.createLogger({
        levels: customeLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({colors: customeLevelOptions.colors}),
                    winston.format.simple()
                ) 
            }),
            new winston.transports.File({
                filename: './errors.log', 
                level: 'warning'
            })
        ]
    })
} else if(config.enviroment === 'dev') {
    logger = winston.createLogger({
        levels: customeLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({colors: customeLevelOptions.colors}),
                    winston.format.simple()
                ) 
            }),
            new winston.transports.File({
                filename: './deverrors.log', 
                level: 'debug'
            })
        ]
    })
}






