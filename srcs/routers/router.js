const authRouter = require('./employers/auth.router')
const uploadRouter = require('./employers/upload.router')
const historyRouter = require('./employers/history.router')
const companyRouter = require('./employers/company.router')
const jobRouter = require('./employers/job.router')
module.exports = (app) => {
    app.use(authRouter)
    app.use(uploadRouter)
    app.use(historyRouter)
    app.use(companyRouter)
    app.use(jobRouter)
}