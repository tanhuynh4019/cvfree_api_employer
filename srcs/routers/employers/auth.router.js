const express = require('express')
const passport = require('passport')

require('../../middlewares/passport.middleware')

const { uploadNone } = require('../../utils/multer.ultil')

const router = express.Router()

const { validateBody, schemas } = require('../../helpers/validates/joi.auth.helpes')

const authController = require('../../controllers/auth.controller')

router.get('/api/auth/secret', passport.authenticate('jwt', {
    session: false
}), authController.secretAuth)
router.get('/api/auth/log-out', passport.authenticate('jwt', {
    session: false
}), authController.logOutAuth)
router.post('/api/auth/register', uploadNone(), validateBody(schemas.authRegisterSchema), authController.registerAuth)
router.patch('/api/auth/login', uploadNone(), validateBody(schemas.authLoginSchema), passport.authenticate('local', {
    session: false
}), authController.loginAuth)
router.patch('/api/auth/change-password', uploadNone(), validateBody(schemas.authChangePasswordSchema), passport.authenticate('jwt', {
    session: false
}), authController.changePasswordAuth)
router.patch('/api/auth/edit-info', uploadNone(), validateBody(schemas.authEditInfoSchema), passport.authenticate('jwt', {
    session: false
}), authController.editInfoAuth)

module.exports = router