import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import {Server} from 'socket.io'
import __dirname from './utils.js'
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/carts.router.js'
import routerViews from './routes/views.router.js'

const URL_DB = 'mongodb+srv://perezalejandro266:155481Ale@database-proyectocoderb.84cvxnw.mongodb.net/?retryWrites=true&w=majority'
const PORT = 8080
const app = express()

mongoose.connect(URL_DB, {dbName: 'E-commerce'})
    .then(() => {
        console.log('DB connected. ✊')
    })
    .catch(e => {
        console.error('Error connecting to DB 😓')
    })

app.use(express.json())
//app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/home', routerViews)




const http = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
export const socketServer = new Server(http)

socketServer.on('connection', socket => {
    console.log('Cliente conectado')
})