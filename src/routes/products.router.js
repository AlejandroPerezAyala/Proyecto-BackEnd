import { Router } from "express";
import ProductManager from "../dao/managers/productManagerMongo.js";
import { uploader } from "../utils.js";
import { socketServer } from "../app.js";

const router = Router()
const productManager = new ProductManager()



router.get('/', async (req,res) =>{
    try{
        const limit = req.query?.limit ?? 10
        const page = req.query?.page ?? 1
        const sort = req.query?.sort ?? "asc"
        const products = await productManager.getProducts(limit, page, sort)
        res.send(products)

    } catch (err) {
        res.status(500).send("Error al obtener los productos" + err)
    }
})

router.get('/:id', async (req,res) => {
    try{
        const id = req.params.id
        const producto = await productManager.getProductById(id)
        res.send(producto)
    } catch (err) {
        res.status(500).send("Error al obtener el producto: " + err)
    }
})

router.post('/', uploader.single('thumbnail'), async (req, res) => {
    try{

        if(!req.file){
            res.status(500).send("No subiste la imagen")
        }

        const data = req.body
        const filename = req.file.filename

        data.thumbnail = `http://localhost:8080/static/images/${filename}`

        const producto = await productManager.getAddProducts(data)
        const productos = await productManager.getProducts()
        socketServer.emit('newProduct', productos)
        res.json(producto)
    } catch (err) {
        res.status(500).send("Error al cargar el producto: " + err)
    }

})

router.put('/:id', uploader.single('thumbnail'), async (req, res) => {
    try{
        const id = req.params.id
        const data = req.body

        if(req.file){
            const filename = req.file.filename
            data.thumbnail = `http://localhost:8080/images/${filename}`
        }

        const producto = await productManager.updateProduct(id, data)

        res.send(producto)
    } catch (err) {
        res.status(500).send("Error al querer upgradear el producto: " + err)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id

        const productEliminated = await productManager.deleteProduct(id)
        socketServer.emit('deleteProduct', productEliminated.res)
        res.json(productEliminated)
    } catch (err) {
        res.status(500).send("Error al querer eliminar el producto: " + err)
    }
})

export default router