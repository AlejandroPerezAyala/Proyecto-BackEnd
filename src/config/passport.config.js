import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import passportJWT from 'passport-jwt'
import userModel from '../dao/mongo/models/user.model.js'
import { cartService } from '../services/index.js'
import {createHash, isValidPassword} from '../utils.js'
import config from './config.js'
import { generateToken } from '../utils.js'

const JWTStrategy = passportJWT.Strategy
const localStrategy = local.Strategy

const cockieExtractor = req => {
    const token = (req?.cookies) ? req.cookies['CoderCookie'] : null

    console.log ('COOKIE EXTRACTOR: ', token)

    return token
}

const initializePassport = () => {

    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const {first_name, last_name, age, email} = req.body
        try {
            const user = await userModel.findOne({email: username})
            if(user){
                console.log("el usuario ya existe")
                return done(null, false)
            }

            const cart = await cartService.createCart()

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                rol: "usuario",
                cart: cart.res._id,
                password: createHash(password)
            }

            const result = await userModel.create(newUser)
            return done(null, result)

        } catch (error) {
            done('error to register: ' + error)
        }
    }))

    passport.use('login', new localStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {

            const user = await userModel.findOne({email:username}).lean().exec()

            if(!user){
                console.log('El usuairo no existe')
                return done(null, false)
            }

            if(!isValidPassword(user, password)){
                console.log('Password incorrecto')
                return done(null, false)
            }

            const token = generateToken(user)
            user.token = token

            return done(null, user)
        } catch (error) {
            return done('Error login' + error)
        }
    }))

    passport.use('jwt', new JWTStrategy({
        secretOrKey: config.jwtSecretKey,
        jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cockieExtractor])
    }, (jwt_payload, done) => {
        return done(null, jwt_payload)
    }))

    passport.use('github', new GitHubStrategy({
        clientID: config.githubId,
        ClientSecret: config.githubSecret,
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    },async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            const user = await userModel.findOne({email:profile._json.email})
            if(!user){
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age,
                    rol: "usuario",
                    email: profile._json.email,
                    password: ""
                }

                const result = await userModel.create(newUser)
                done(null, result)
            } else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {

        const user = await userModel.findById(id)
        done(null, user)
    })

}

export default initializePassport