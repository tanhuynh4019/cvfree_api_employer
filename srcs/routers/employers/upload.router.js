const express = require('express')
const multer = require('multer')
const passport = require('passport')

require('../../middlewares/passport.middleware')

const { uploadImage } = require('../../utils/multer.ultil')

const uploadController = require('../../controllers/upload.controller')

const router = express.Router()

router.patch('/api/upload/upload-avatar', uploadImage('srcs/uploads/images/employers', 'image'), passport.authenticate('jwt', {
    session: false
}), uploadController.uploadAvatar)

module.exports = router