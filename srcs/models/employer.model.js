const mongoose = require('mongoose')
const { isEmail } = require('validator')

const { REQUIRED, INVALID } = require('../modules/message.module')
const regexModule = require('../modules/regex.module')

const employerSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: REQUIRED('E-mail', true),
        validate: [isEmail, INVALID('E-mail')]
    },
    password: {
        type: String,
        required: REQUIRED('Mật khẩu', true),
        match: [regexModule.new.password, INVALID('Mật khẩu')]
    },
    fullname: {
        type: String,
        required: REQUIRED('Họ và tên', true),
        minLength: [3, 'Họ và tên phải trên 3 ký tự!'],
        maxLength: [50, 'Họ và tên không vượt quá 50 ký tự!']
    },
    phone: {
        type: String,
        required: REQUIRED('Số điện thoại', true),
        match: [regexModule.new.phone_vn, INVALID('Số điện thoại')]
    },
    gender: {
        type: String,
        required: REQUIRED('Giới tính', true),
        enum: ['Nam', 'Nữ'],

    },
    company: {
        type: String,
        require: true
    },
    position: {
        type: String,
        require: true
    },
    workLocation: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    accountSkype: {
        type: String
    },
    accountZalo: {
        type: String
    },
    isTeamOfService: {
        type: Boolean
    },
    isCompany: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAccept: {
        type: Boolean,
        required: true
    },
    isBin: {
        type: Boolean,
        default: false
    },
    coin: {
        type: Number,
        default: 0
    },
    dateEdit: {
        type: Date,
        default: Date.now()
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
    businessPoints: {
        type: Number,
        default: 0
    },
    avatar: {
        type: Object,
        default: {
            filename: '/avatar.png'
        }
    },
    member: {
        type: Number,
        default: 1
    },
    vipTopMax: {
        type: Object,
        default: {
            isActive: false,
            deadline: null
        }
    },
    vipTopPro: {
        type: Object,
        default: {
            isActive: false,
            deadline: null
        }
    },
    vipTopManager: {
        type: Object,
        default: {
            isActive: false,
            deadline: null
        }
    },
    vipTopSalary: {
        type: Object,
        default: {
            isActive: false,
            deadline: null
        }
    },
    vipTopIT: {
        type: Object,
        default: {
            isActive: false,
            deadline: null
        }
    },
    vipTopEco: {
        type: Object,
        default: {
            isActive: false,
            deadline: null
        }
    },
    vipTemplatePro: {
        type: Object,
        default: {
            isActive: false,
            deadline: null
        }
    },
    vipTemplateMax: {
        type: Object,
        default: {
            isActive: false,
            deadline: null
        }
    },
})
module.exports = mongoose.model('Employer', employerSchema);