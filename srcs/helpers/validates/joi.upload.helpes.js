const Joi = require('joi')
const { REQUIRED, INVALID, EMPTY, NOTTRUE } = require('../../modules/message.module')

const validateBody = (schema) => {
    return (req, res, next) => {
        const validateResult = schema.validate(req.body)

        if (validateResult.error) {
            return res.status(400).json({
                error: true,
                status: 400,
                message: validateResult.error.message
            })
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.body = validateResult.value
            next()
        }
    }
}

const schemas = {
    uploadAvatarSchema: Joi.object().keys({
        email: Joi.string().email().empty().required().messages({
            'string.email': INVALID('E-mail'),
            'any.required': REQUIRED('E-mail', true),
            'string.empty': EMPTY('E-mail'),
        })
    })
}

module.exports = {
    validateBody,
    schemas
}