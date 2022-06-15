const express = require('express')
const multer = require('multer')
const router = express.Router()
const upload = multer()

const { validateBody, schemas } = require('../../helpers/validates/joi.auth.helpes')

const authController = require('../../controllers/auth.controller')

router.post('/api/auth/register', upload.none(), validateBody(schemas.authRegisterSchema), authController.registerAuth)

module.exports = router