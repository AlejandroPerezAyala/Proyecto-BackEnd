import { Router } from "express";
import { getProducts, getProductById, getAddProducts, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { uploader } from "../utils.js";
import { current } from "../middlewares/middlewares.js";


const router = Router()

const ROL = "admin"


router.get('/', getProducts)

router.get('/:id', getProductById)

router.post('/', getAddProducts)

router.put('/:id', uploader.single('thumbnail'), current(ROL),updateProduct)

router.delete('/:id', current(ROL) ,deleteProduct)

export default router