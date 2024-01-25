import {Cart, Product} from '../dao/factory.js'
import ProductService from './products.service.js'
import CartServices from './cart.service.js'


export const productService = new ProductService(new Product())
export const cartService = new CartServices(new Cart())
