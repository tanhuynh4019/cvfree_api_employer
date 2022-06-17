const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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
        enum: ['Nam', 'Nữ']
    },
    company: {
        type: String,
        required: REQUIRED('Tên công ty', true)
    },
    position: {
        type: String,
        required: REQUIRED('Vị trí công tác', true)
    },
    workLocation: {
        type: String,
        required: REQUIRED('Tỉnh/Thành phố', true)
    },
    district: {
        type: String,
        required: REQUIRED('Quận/Huyện', true)
    },
    ward: {
        type: String,
        required: REQUIRED('Xã', true)
    },
    accountSkype: {
        type: String,
        match: [regexModule.new.phone_vn, INVALID('Tài khoản skype')]
    },
    accountZalo: {
        type: String,
        match: [regexModule.new.phone_vn, INVALID('Số điện thoại Zalo')]
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
        default: true
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
    dateAllowChangePassword: {
        type: Date
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
    dateChangePassword: {
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
            filename: 'avatar.png'
        }
    },
    member: {
        type: Number,
        default: 1
    },
    numberErrorChangePassword: {
        type: Number
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


employerSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = mongoose.model('Employer', employerSchema);