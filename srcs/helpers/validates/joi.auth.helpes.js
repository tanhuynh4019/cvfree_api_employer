const Joi = require('joi')

const regexModule = require('../../modules/regex.module')
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
    authRegisterSchema: Joi.object().keys({
        email: Joi.string().email().empty().required().messages({
            'string.email': INVALID('E-mail'),
            'any.required': REQUIRED('E-mail', true),
            'string.empty': EMPTY('E-mail'),
        }),
        password: Joi.string().pattern(new RegExp(regexModule.new.password)).empty().required().messages({
            'string.pattern.base': INVALID('Mật khẩu'),
            'any.required': REQUIRED('Mật khẩu', true),
            'string.empty': EMPTY('Mật khẩu'),
        }),
        confirmPassword: Joi.any().valid(Joi.ref('password')).empty().required().messages({
            'any.required': REQUIRED('Xác nhận mật khẩu', true),
            'any.only': NOTTRUE('Xác nhận mật khẩu'),
            'string.empty': EMPTY('Xác nhận mật khẩu'),
        }),
        fullname: Joi.string().min(3).max(50).empty().required().messages({
            'any.required': REQUIRED('Họ và tên', true),
            'string.empty': EMPTY('Họ và tên'),
            'string.min': 'Họ và tên phải trên {{#limit}} ký tự!',
            'string.max': 'Họ và tên không vượt quá {{#limit}} ký tự!'
        }),
        phone: Joi.string().pattern(new RegExp(regexModule.new.phone_vn)).empty().required().messages({
            'string.pattern.base': INVALID('Số điện thoại'),
            'any.required': REQUIRED('Số điện thoại', true),
            'string.empty': EMPTY('Số điện thoại'),
        }),
        gender: Joi.string().valid('Nam', 'Nữ').empty().required().messages({
            'any.required': REQUIRED('Giới tính', true),
            'string.empty': EMPTY('Giới tính'),
            'any.only': INVALID('Giới tính'),
        }),
        company: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Tên công ty', true),
            'string.empty': EMPTY('Tên công ty'),
        }),
        position: Joi.string().valid('Nhân viên', 'Trưởng nhóm', 'Phó phòng', 'Trưởng phòng', 'Phó giám đốc', 'Giám đốc', 'Tổng giám đốc').empty().required().messages({
            'any.required': REQUIRED('Vị trí công tác', true),
            'string.empty': EMPTY('Vị trí công tác'),
            'any.only': INVALID('Vị trí công tác'),
        }),
        workLocation: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Tỉnh/Thành phố', true),
            'string.empty': EMPTY('Tỉnh/Thành phố'),
        }),
        district: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Quận/Huyện', true),
            'string.empty': EMPTY('Quận/Huyện'),
        }),
        ward: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Xã', true),
            'string.empty': EMPTY('Xã'),
        }),
        accountSkype: Joi.string().allow(null, '').pattern(new RegExp(regexModule.new.phone_vn)).messages({
            'string.pattern.base': INVALID('Tài khoản skype'),
        }),
        accountZalo: Joi.string().allow(null, '').pattern(new RegExp(regexModule.new.phone_vn)).messages({
            'string.pattern.base': INVALID('Số điện thoại Zalo'),
        }),
        isAccept: Joi.boolean().invalid(false).empty().required().messages({
            'any.invalid': 'Vui lòng chấp nhận thỏa thuận!',
            'any.required': REQUIRED('Vui lòng chấp nhận', true),
        }),
    }),
    authLoginSchema: Joi.object().keys({
        email: Joi.string().email().empty().required().messages({
            'any.required': REQUIRED('E-mail', true),
            'string.empty': EMPTY('E-mail'),
        }),
        password: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Mật khẩu', true),
            'string.empty': EMPTY('Mật khẩu'),
        })
    }),
    authChangePasswordSchema: Joi.object().keys({
        passwordOld: Joi.string().empty().required().messages({
            'string.pattern.base': INVALID('Mật khẩu cũ'),
            'any.required': REQUIRED('Mật khẩu cũ', true),
            'string.empty': EMPTY('Mật khẩu cũ'),
        }),
        passwordNew: Joi.string().pattern(new RegExp(regexModule.new.password)).empty().required().messages({
            'string.pattern.base': INVALID('Mật khẩu mới'),
            'any.required': REQUIRED('Mật khẩu mới', true),
            'string.empty': EMPTY('Mật khẩu mới'),
        }),
        confirmNewPassword: Joi.any().valid(Joi.ref('passwordNew')).empty().required().messages({
            'any.required': REQUIRED('Xác nhận mật khẩu', true),
            'any.only': NOTTRUE('Xác nhận mật khẩu'),
            'string.empty': EMPTY('Xác nhận mật khẩu'),
        }),
        isLogOut: Joi.boolean().default(false).messages(),
    }),
    authEditInfoSchema: Joi.object().keys({
        fullname: Joi.string().min(3).max(50).empty().required().messages({
            'any.required': REQUIRED('Họ và tên', true),
            'string.empty': EMPTY('Họ và tên'),
            'string.min': 'Họ và tên phải trên {{#limit}} ký tự!',
            'string.max': 'Họ và tên không vượt quá {{#limit}} ký tự!'
        }),
        gender: Joi.string().valid('Nam', 'Nữ').empty().required().messages({
            'any.required': REQUIRED('Giới tính', true),
            'string.empty': EMPTY('Giới tính'),
            'any.only': INVALID('Giới tính'),
        }),
        position: Joi.string().valid('Nhân viên', 'Trưởng nhóm', 'Phó phòng', 'Trưởng phòng', 'Phó giám đốc', 'Giám đốc', 'Tổng giám đốc').empty().required().messages({
            'any.required': REQUIRED('Vị trí công tác', true),
            'string.empty': EMPTY('Vị trí công tác'),
            'any.only': INVALID('Vị trí công tác'),
        }),
        accountSkype: Joi.string().allow(null, '').pattern(new RegExp(regexModule.new.phone_vn)).messages({
            'string.pattern.base': INVALID('Tài khoản skype'),
        }),
        accountZalo: Joi.string().allow(null, '').pattern(new RegExp(regexModule.new.phone_vn)).messages({
            'string.pattern.base': INVALID('Số điện thoại Zalo'),
        }),
    })
}

module.exports = {
    validateBody,
    schemas
}