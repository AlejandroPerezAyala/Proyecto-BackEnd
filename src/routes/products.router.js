import { Router } from "express";
import { getProducts, getProductById, getAddProducts, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { uploader } from "../utils.js";


const router = Router()




router.get('/', getProducts)

router.get('/:id', getProductById)

router.post('/', getAddProducts)

router.put('/:id', uploader.single('thumbnail'), updateProduct)

router.delete('/:id',deleteProduct)

export default router