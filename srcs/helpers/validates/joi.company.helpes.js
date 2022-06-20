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
    companyCreateSchema: Joi.object().keys({
        name: Joi.string().min(5).max(500).empty().required().messages({
            'any.required': REQUIRED('Tên công ty', true),
            'string.empty': EMPTY('Tên công ty'),
            'string.min': 'Tên công ty phải trên {{#limit}} ký tự!',
            'string.max': 'Tên công ty không vượt quá {{#limit}} ký tự!'
        }),
        introduct: Joi.string().min(10).max(20000).empty().required().messages({
            'any.required': REQUIRED('Mô tả công ty', true),
            'string.empty': EMPTY('Mô tả công ty'),
            'string.min': 'Mô tả công ty phải trên {{#limit}} ký tự!',
            'string.max': 'Mô tả công ty không vượt quá {{#limit}} ký tự!'
        }),
        foundedYear: Joi.number().integer().min(1970).max(2022).required().messages({
            'any.required': REQUIRED('Năm thành lập', true),
            'string.empty': EMPTY('Năm thành lập'),
            'number.base': 'Năm thành lập phải là số!',
            'number.min': 'Năm thành lập phải trên năm {{#limit}} !',
            'number.max': 'Năm thành lập không vượt quá năm {{#limit}}!'
        }),
        averageAge: Joi.number().allow(null, '').integer().min(18).max(55).messages({
            'number.base': 'Độ tuổi trung bình phải là số!',
            'number.min': 'Độ tuổi trung bình trên năm {{#limit}} !',
            'number.max': 'Độ tuổi trung bình không vượt quá năm {{#limit}}!'
        }),
        companySizeStart: Joi.number().allow(null, '').integer().min(1).max(200000).messages({
            'number.base': 'Quy mô nhỏ nhất phải là số!',
            'number.min': 'Quy mô nhỏ nhất không nhỏ hơn {{#limit}} !',
            'number.max': 'Quy mô nhỏ nhất không vượt quá {{#limit}}!'
        }),
        companySizeEnd: Joi.number().allow(null, '').integer().min(1).max(200000).messages({
            'number.base': 'Quy mô lớn nhất phải là số!',
            'number.min': 'Quy mô lớn nhất không nhỏ hơn {{#limit}} !',
            'number.max': 'Quy mô lớn nhất không vượt quá {{#limit}}!'
        }),
        srcVideoYoutube: Joi.string().allow(null, '').pattern(new RegExp(regexModule.new.linkYoutube)).messages({
            'string.pattern.base': 'Link intro không hợp lệ hoặc cvfree chưa hỗ trợ!',
        }),
        phone: Joi.string().pattern(new RegExp(regexModule.new.phone_vn)).empty().required().messages({
            'string.pattern.base': INVALID('Số điện thoại'),
            'any.required': REQUIRED('Số điện thoại', true),
            'string.empty': EMPTY('Số điện thoại'),
        }),
        website: Joi.string().pattern(new RegExp(regexModule.new.url)).allow(null, '').messages({
            'string.pattern.base': INVALID('Link website')
        }),
        address: Joi.string().empty().max(250).min(5).required().messages({
            'any.required': REQUIRED('Địa chỉ cụ thể', true),
            'string.empty': EMPTY('Địa chỉ cụ thể'),
            'string.min': 'Địa chỉ cụ thể không nhỏ hơn {{#limit}} ký tự!',
            'string.max': 'Địa chỉ cụ thể không vượt quá {{#limit}} ký tự!'
        }),
        srcMap: Joi.string().allow(null, '').pattern(new RegExp(regexModule.new.url)).messages({
            'string.pattern.base': 'Link map không hợp lệ!',
        }),
        career: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Nghành nghề chính', true),
            'string.empty': EMPTY('Nghành nghề chính')
        }),
        careers: Joi.string().allow(null, '').messages({}),
        location: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Khu vực chính', true),
            'string.empty': EMPTY('Khu vực chính')
        }),
        locations: Joi.string().allow(null, '').messages({}),
    }),
}

module.exports = {
    validateBody,
    schemas
}