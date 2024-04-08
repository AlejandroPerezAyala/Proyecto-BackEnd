import { Router } from "express";
import { getMockingProducts } from "../controllers/products.controller.js";

const router = Router()

router.get('/mockingproducts', getMockingProducts)

router.get('/loggertest', (req, res) => {
    req.logger.fatal('FATAL')
    req.logger.error('ERROR')
    req.logger.warning('WARNING')
    req.logger.info('INFO')
    req.logger.http('HTTP')
    req.logger.debug('DEBUG')

    res.send('Probando logger')
})

export default router