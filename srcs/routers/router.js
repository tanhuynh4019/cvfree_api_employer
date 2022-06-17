const authRouter = require('./employers/auth.router')
const uploadRouter = require('./employers/upload.router')
module.exports = (app) => {
    app.use(authRouter)
    app.use(uploadRouter)
}