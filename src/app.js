import express from 'express'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import __dirname from './utils.js'
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/carts.router.js'
import routerViews from './routes/views.router.js'
import routerSessions from './routes/session.router.js'
import routerUser from './routes/user.router.js'
import routerCheckOut from './routes/checkout.router.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import config from './config/config.js'
import cookieParser from 'cookie-parser'
import mockingRouter from './routes/mocking.router.js'
import { addLogger } from './middlewares/middlewares.js'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import cors from 'cors'
 
const app = express()

initializePassport()

const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title: 'Documentacion de API para E-commerce',
            description: "API creada para un e-commerce de Zapatillas"
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsdoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(cors())
app.use(cookieParser(config.blockCookie))
app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname + '/public'))
app.use(addLogger)

app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', routerViews)
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/api/sessions', routerSessions)
app.use('/home', routerViews)
app.use('/api/user', routerUser)
app.use('/api/mocking', mockingRouter)
app.use('/api/create_preference', routerCheckOut)

const http = app.listen(config.port, () => console.log(`Servidor corriendo en el puerto ${config.port}`))
export const socketServer = new Server(http)

socketServer.on('connection', socket => {
    console.log('Cliente conectado')
})