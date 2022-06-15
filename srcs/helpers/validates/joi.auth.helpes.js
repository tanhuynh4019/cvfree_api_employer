const Joi = require('joi')

const regexModule = require('../../modules/regex.module')

const validateBody = (schema) => {
    return (req, res, next) => {
        const validateResult = schema.validate(req.body)

        if (validateResult.error) {
            return res.status(400).json({
                error: true,
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
    authRegisterSchema: Joi.object().keys({
        email: Joi.string().email().empty().required().messages({
            'string.email': 'E-mail không hợp lệ!',
            'any.required': 'E-mail không tồn tại!',
            'string.empty': 'E-mail không được để trống!'
        }),
        password: Joi.string().pattern(new RegExp(regexModule.new.email)).empty().required().messages({
            'string.pattern.base': 'Mật khẩu không hợp lệ!',
            'any.required': 'Mật khẩu không tồn tại!',
            'string.empty': 'Mật khẩu không được để trống!'
        }),
        confirmPassword: Joi.any().valid(Joi.ref('password')).empty().required().messages({
            'any.required': 'Xác nhận mật khẩu không tồn tại!',
            'any.only': 'Xác nhận mật khẩu không đúng!',
            'string.empty': 'Xác nhận mật khẩu không được để trống!'
        }),
        fullname: Joi.string().min(3).max(50).empty().required().messages({
            'any.required': 'Họ và tên không được để trống!',
            'string.empty': 'Họ và tên không tồn tại!',
            'string.min': 'Họ và tên phải trên {{#limit}} ký tự!',
            'string.max': 'Họ và tên không vượt quá {{#limit}} ký tự!'
        }),
        phone: Joi.string().pattern(new RegExp(regexModule.new.phone_vn)).empty().required().messages({
            'string.pattern.base': 'Số điện thoại không hợp lệ!',
            'any.required': 'Số điện thoại không tồn tại!',
            'string.empty': 'Số điện thoại không được để trống!'
        }),
        gender: Joi.string().valid('Nam', 'Nữ').empty().required().messages({
            'any.required': 'Giới tính không tồn tại!',
            'string.empty': 'Giới tính không được để trống!',
            'any.only': 'Giới tính phải là Nam hoặc Nữ!',
        }),
        company: Joi.string().empty().required().messages({
            'any.required': 'Tên công ty không tồn tại!',
            'string.empty': 'Tên công ty không được để trống!',
        }),
        position: Joi.string().empty().required().messages({
            'any.required': 'Vị trí công tác không tồn tại!',
            'string.empty': 'Vị trí công tác không được để trống!',
        }),
        workLocation: Joi.string().empty().required().messages({
            'any.required': 'Tỉnh/Thành phố không tồn tại!',
            'string.empty': 'Tỉnh/Thành phố không được để trống!',
        }),
        district: Joi.string().empty().required().messages({
            'any.required': 'Quận/Huyện không tồn tại!',
            'string.empty': 'Quận/Huyện không được để trống!',
        }),
        accountSkype: Joi.string().allow(null, '').pattern(new RegExp(regexModule.new.phone_vn)).messages({
            'string.pattern.base': 'Tài khoản skype không hợp lệ!'
        }),
        accountZalo: Joi.string().allow(null, '').pattern(new RegExp(regexModule.new.phone_vn)).messages({
            'string.pattern.base': 'Số điện thoại Zalo không hợp lệ!'
        }),
        isAccept: Joi.boolean().invalid(false).empty().required().messages({
            'any.invalid': 'Vui lòng chấp nhận thỏa thuận!',
            'any.required': 'Vui lòng chấp nhận thỏa thuận không tồn tại!'
        }),

    })
}

module.exports = {
    validateBody,
    schemas
}