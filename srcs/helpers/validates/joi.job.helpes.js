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
    jobCreateSchema: Joi.object().keys({
        name: Joi.string().min(5).max(500).empty().required().messages({
            'any.required': REQUIRED('Tên việc làm', true),
            'string.empty': EMPTY('Tên việc làm'),
            'string.min': 'Tên việc làm phải trên {{#limit}} ký tự!',
            'string.max': 'Tên việc làm không vượt quá {{#limit}} ký tự!'
        }),
        vacancies: Joi.string().min(5).max(200).empty().required().messages({
            'any.required': REQUIRED('Vị trí ứng tuyển', true),
            'string.empty': EMPTY('Vị trí ứng tuyển'),
            'string.min': 'Vị trí ứng tuyển phải trên {{#limit}} ký tự!',
            'string.max': 'Vị trí ứng tuyển không vượt quá {{#limit}} ký tự!'
        }),
        workLocation: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Khu vực làm việc', true),
            'string.empty': EMPTY('Khu vực làm việc')
        }),
        mainJob: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Nghành nghề chính', true),
            'string.empty': EMPTY('Nghành nghề chính')
        }),
        numberOfRecruitments: Joi.number().allow(null, '').integer().max(200000).messages({
            'number.base': 'Số lượng tuyển phải là số!',
            'number.max': 'Số lượng tuyển không vượt quá {{#limit}}!'
        }),
        workingForm: Joi.string().valid('Toàn thời gian', 'Bán thời gian', 'Remote').empty().required().messages({
            'any.required': REQUIRED('Loại công việc', true),
            'string.empty': EMPTY('Loại công việc'),
            'any.only': INVALID('Loại công việc'),
        }),
        gender: Joi.string().valid('Nam', 'Nữ', 'Không yêu cầu').empty().required().messages({
            'any.required': REQUIRED('Giới tính', true),
            'string.empty': EMPTY('Giới tính'),
            'any.only': INVALID('Giới tính'),
        }),
        level: Joi.string().valid('Nhân viên', 'Trưởng nhóm', 'Phó phòng', 'Trưởng phòng', 'Phó giám đốc', 'Giám đốc', 'Tổng giám đốc').empty().required().messages({
            'any.required': REQUIRED('Cấp bậc', true),
            'string.empty': EMPTY('Cấp bậc'),
            'any.only': INVALID('Cấp bậc'),
        }),
        exp: Joi.string().valid('Chưa có kinh nghiệm', 'Dưới 1 năm kinh nghiệm', '1 năm kinh nghiệm', '2 năm kinh nghiệm', '3 năm kinh nghiệm', '4 năm kinh nghiệm', 'Trên 5 kinh nghiệm').empty().required().messages({
            'any.required': REQUIRED('Kinh nghiệm', true),
            'string.empty': EMPTY('Kinh nghiệm'),
        }),
        currency: Joi.string().valid('VNĐ', '$').empty().required().messages({
            'any.required': REQUIRED('Kiểu tiền tệ', true),
            'string.empty': EMPTY('Kiểu tiền tệ'),
            'any.only': INVALID('Kiểu tiền tệ'),
        }),
        salaryType: Joi.string().valid('Trong khoảng', 'Từ', 'Đến', 'Thỏa thuận').empty().required().messages({
            'any.required': REQUIRED('Kiểu tiền tệ', true),
            'string.empty': EMPTY('Kiểu tiền tệ'),
            'any.only': INVALID('Kiểu tiền tệ'),
        }),
        jobLocation: Joi.string().empty().max(250).min(5).required().messages({
            'any.required': REQUIRED('Địa chỉ cụ thể', true),
            'string.empty': EMPTY('Địa chỉ cụ thể'),
            'string.min': 'Địa chỉ cụ thể không nhỏ hơn {{#limit}} ký tự!',
            'string.max': 'Địa chỉ cụ thể không vượt quá {{#limit}} ký tự!'
        }),
        salaryTo: Joi.number().allow(null, '').integer().messages({
            'number.base': 'Số tiền bắt đầu phải là số!'
        }),
        salaryFrom: Joi.number().allow(null, '').integer().messages({
            'number.base': 'Số tiền bắt đầu phải là số!'
        }),
        jobDescription: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Mô tả', true),
            'string.empty': EMPTY('Mô tả')
        }),
        candidateRequirements: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Yêu cầu', true),
            'string.empty': EMPTY('Yêu cầu')
        }),
        benefit: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Quyền lợi', true),
            'string.empty': EMPTY('Quyền lợi')
        }),
        deadline: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Ngày hết hạn', true),
            'string.empty': EMPTY('Ngày hết hạn')
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
        emails: Joi.string().email().empty().required().messages({
            'string.email': INVALID('E-mail'),
            'any.required': REQUIRED('E-mail', true),
            'string.empty': EMPTY('E-mail'),
        }),
        sideProfessions: Joi.string().allow(null, '').messages({}),
        skills: Joi.string().allow(null, '').messages({}),
    }),
    jobEditSchema: Joi.object().keys({
        name: Joi.string().min(5).max(500).empty().required().messages({
            'any.required': REQUIRED('Tên việc làm', true),
            'string.empty': EMPTY('Tên việc làm'),
            'string.min': 'Tên việc làm phải trên {{#limit}} ký tự!',
            'string.max': 'Tên việc làm không vượt quá {{#limit}} ký tự!'
        }),
        vacancies: Joi.string().min(5).max(200).empty().required().messages({
            'any.required': REQUIRED('Vị trí ứng tuyển', true),
            'string.empty': EMPTY('Vị trí ứng tuyển'),
            'string.min': 'Vị trí ứng tuyển phải trên {{#limit}} ký tự!',
            'string.max': 'Vị trí ứng tuyển không vượt quá {{#limit}} ký tự!'
        }),
        workLocation: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Khu vực làm việc', true),
            'string.empty': EMPTY('Khu vực làm việc')
        }),
        mainJob: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Nghành nghề chính', true),
            'string.empty': EMPTY('Nghành nghề chính')
        }),
        numberOfRecruitments: Joi.number().allow(null, '').integer().max(200000).messages({
            'number.base': 'Số lượng tuyển phải là số!',
            'number.max': 'Số lượng tuyển không vượt quá {{#limit}}!'
        }),
        workingForm: Joi.string().valid('Toàn thời gian', 'Bán thời gian', 'Remote').empty().required().messages({
            'any.required': REQUIRED('Loại công việc', true),
            'string.empty': EMPTY('Loại công việc'),
            'any.only': INVALID('Loại công việc'),
        }),
        gender: Joi.string().valid('Nam', 'Nữ', 'Không yêu cầu').empty().required().messages({
            'any.required': REQUIRED('Giới tính', true),
            'string.empty': EMPTY('Giới tính'),
            'any.only': INVALID('Giới tính'),
        }),
        level: Joi.string().valid('Nhân viên', 'Trưởng nhóm', 'Phó phòng', 'Trưởng phòng', 'Phó giám đốc', 'Giám đốc', 'Tổng giám đốc').empty().required().messages({
            'any.required': REQUIRED('Cấp bậc', true),
            'string.empty': EMPTY('Cấp bậc'),
            'any.only': INVALID('Cấp bậc'),
        }),
        exp: Joi.string().valid('Chưa có kinh nghiệm', 'Dưới 1 năm kinh nghiệm', '1 năm kinh nghiệm', '2 năm kinh nghiệm', '3 năm kinh nghiệm', '4 năm kinh nghiệm', 'Trên 5 kinh nghiệm').empty().required().messages({
            'any.required': REQUIRED('Kinh nghiệm', true),
            'string.empty': EMPTY('Kinh nghiệm'),
        }),
        currency: Joi.string().valid('VNĐ', '$').empty().required().messages({
            'any.required': REQUIRED('Kiểu tiền tệ', true),
            'string.empty': EMPTY('Kiểu tiền tệ'),
            'any.only': INVALID('Kiểu tiền tệ'),
        }),
        salaryType: Joi.string().valid('Trong khoảng', 'Từ', 'Đến', 'Thỏa thuận').empty().required().messages({
            'any.required': REQUIRED('Kiểu tiền tệ', true),
            'string.empty': EMPTY('Kiểu tiền tệ'),
            'any.only': INVALID('Kiểu tiền tệ'),
        }),
        jobLocation: Joi.string().empty().max(250).min(5).required().messages({
            'any.required': REQUIRED('Địa chỉ cụ thể', true),
            'string.empty': EMPTY('Địa chỉ cụ thể'),
            'string.min': 'Địa chỉ cụ thể không nhỏ hơn {{#limit}} ký tự!',
            'string.max': 'Địa chỉ cụ thể không vượt quá {{#limit}} ký tự!'
        }),
        salaryTo: Joi.number().allow(null, '', 0).integer().messages({
            'number.base': 'Số tiền bắt đầu phải là số!'
        }),
        salaryFrom: Joi.number().allow(null, '', 0).integer().messages({
            'number.base': 'Số tiền bắt đầu phải là số!'
        }),
        jobDescription: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Mô tả', true),
            'string.empty': EMPTY('Mô tả')
        }),
        candidateRequirements: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Yêu cầu', true),
            'string.empty': EMPTY('Yêu cầu')
        }),
        benefit: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Quyền lợi', true),
            'string.empty': EMPTY('Quyền lợi')
        }),
        deadline: Joi.string().empty().required().messages({
            'any.required': REQUIRED('Ngày hết hạn', true),
            'string.empty': EMPTY('Ngày hết hạn')
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
        emails: Joi.string().email().empty().required().messages({
            'string.email': INVALID('E-mail'),
            'any.required': REQUIRED('E-mail', true),
            'string.empty': EMPTY('E-mail'),
        }),
        sideProfessions: Joi.string().allow(null, '').messages({}),
        skills: Joi.string().allow(null, '').messages({}),
    })
}

module.exports = {
    validateBody,
    schemas
}