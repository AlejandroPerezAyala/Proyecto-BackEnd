import express from 'express'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import __dirname from './utils.js'
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/carts.router.js'
import routerViews from './routes/views.router.js'
import routerSessions from './routes/session.router.js'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import config from './config/config.js'

const app = express()

app.use(session({
    store: mongoStore.create({
        mongoUrl: config.mongoURL,
        dbName: config.mongoDBName,
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

initializePassport()

app.use(passport.initialize())
app.use(passport.session())
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

const http = app.listen(config.port, () => console.log(`Servidor corriendo en el puerto ${config.port}`))
export const socketServer = new Server(http)

socketServer.on('connection', socket => {
    console.log('Cliente conectado')
})