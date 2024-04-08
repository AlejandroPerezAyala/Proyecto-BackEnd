import multer from 'multer'
import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from './config/config.js'
import {faker} from "@faker-js/faker"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './src/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user,password) => bcrypt.compareSync(password, user.password)

export const generateToken =  user => {
    const token = jwt.sign({user}, config.jwtSecretKey, {expiresIn: '24h'})
    return token
}

export const generateProducts = () => {
    const product = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.urlPicsumPhotos(),
        code: faker.word.words(),
        stock: faker.number.int({max: 100}),
    }

    return product
}

export default __dirname
export const uploader = multer({storage})
