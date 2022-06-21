const express = require('express')
const passport = require('passport')

require('../../middlewares/passport.middleware')

const { uploadImageField } = require('../../utils/multer.ultil')

const companyController = require('../../controllers/company.controller')

const router = express.Router()

const { validateBody, schemas } = require('../../helpers/validates/joi.company.helpes')

router.post('/api/company', uploadImageField('srcs/uploads/images/companies', [{
    name: 'srcLogo',
    maxCount: 1
}, {
    name: 'srcBanner',
    maxCount: 1
}]), validateBody(schemas.companyCreateSchema), passport.authenticate('jwt', {
    session: false
}), companyController.createCompany)

router.patch('/api/company/:idCompany', uploadImageField('srcs/uploads/images/companies', [{
    name: 'srcLogo',
    maxCount: 1
}, {
    name: 'srcBanner',
    maxCount: 1
}]), validateBody(schemas.companyEditSchema), passport.authenticate('jwt', {
    session: false
}), companyController.editCompany)

router.get('/api/company/by-employer', uploadImageField('srcs/uploads/images/companies', [{
    name: 'srcLogo',
    maxCount: 1
}, {
    name: 'srcBanner',
    maxCount: 1
}]), passport.authenticate('jwt', {
    session: false
}), companyController.getByCompany)

module.exports = router