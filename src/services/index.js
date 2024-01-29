import {Cart, Product, User} from '../dao/factory.js'
import ProductService from './products.service.js'
import CartServices from './cart.service.js'
import UserServices from './user.service.js'


export const productService = new ProductService(new Product())
export const cartService = new CartServices(new Cart())
export const userService = new UserServices(new User())
