const authRouter = require('./employers/auth.router')
module.exports = (app) => {
    app.use(authRouter)
}