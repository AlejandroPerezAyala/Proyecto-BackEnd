import multer from 'multer'
import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'


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


export default __dirname
export const uploader = multer({storage})
