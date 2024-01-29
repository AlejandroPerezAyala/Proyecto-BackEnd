import express from 'express'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import __dirname from './utils.js'
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/carts.router.js'
import routerViews from './routes/views.router.js'
import routerSessions from './routes/session.router.js'
import routerUser from './routes/user.router.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import config from './config/config.js'
import cookieParser from 'cookie-parser'

const app = express()

initializePassport()

app.use(cookieParser(config.blockCookie))
app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/api/sessions', routerSessions)
app.use('/home', routerViews)
app.use('/api/user', routerUser)

const http = app.listen(config.port, () => console.log(`Servidor corriendo en el puerto ${config.port}`))
export const socketServer = new Server(http)

socketServer.on('connection', socket => {
    console.log('Cliente conectado')
})