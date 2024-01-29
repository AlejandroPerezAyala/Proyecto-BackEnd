import dotenv from 'dotenv'

dotenv.config()

export default {
    persistence: process.env.PERSISTENCE,
    userAdmin: process.env.USER_ADMIN,
    passAdmin: process.env.PASS_ADMIN,
    port: process.env.PORT ,
    mongoURL: process.env.MONGO_URL,
    mongoDBName: process.env.MONGO_DB_NAME,
    githubId: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_CLIENT_SECRET,
    jwtSecretKey: process.env.JWT_PRIVATE_KEY,
    blockCookie: process.env.PRIVATE_COOKIE
}