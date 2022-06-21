const keyModule = require('../modules/key.module')
const { formatDate_VN } = require('../modules/format.module')
const { INCORRECT } = require('../modules/message.module')
const typeModule = require('../modules/type.module')
const coinModule = require('../modules/coin.module')

const companyModel = require('../models/company.model')
const employerModel = require('../models/employer.model')

const { sendHistorySlack } = require('../utils/slack.util')

const historyService = require('../services/history.service')
const coinService = require('../services/coin.service')

const dateNow = Date.now()

const create = async(body, query, files, user, ip) => {
    try {
        const arrCarrer = []
        const arrLocation = []
        if (body.careers) {

            body.careers.split(',').forEach(arr => {
                if (arr != '') {
                    arrCarrer.push(arr)
                }
            })
        }

        if (body.locations) {

            body.locations.split(',').forEach(arr => {
                if (arr != '') {
                    arrLocation.push(arr)
                }
            })
        }


        const { key } = query
        //* validate
        if (key != keyModule.SERVICE.COMPANY) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (user.isCompany) {
            setMessage('Một công ty chỉ được phép có một thông tin công ty, trừ trường hợp được cvfree cung cấp!')
            return false
        } else {
            const companyBy = await companyModel.findOne({ idEmployer: user._id })
            if (companyBy) {
                setMessage('Một công ty chỉ được phép có một thông tin công ty, trừ trường hợp được cvfree cung cấp!')
                return false
            }

            await employerModel.findByIdAndUpdate(user._id, { isCompany: true })
        }

        body.srcLogo = files.srcLogo[0]
        body.srcBanner = files.srcBanner[0]
        body.idEmployer = user._id
        body.careers = arrCarrer
        body.locations = arrLocation

        const edit = await companyModel.create(body)

        //* send slack and save history
        historyService.create({ idEmployer: user._id, content: 'Tạo thông tin công ty', ip, type: typeModule.HISTORY.WORK, role: typeModule.ROLE.EMPLOYER })
        sendHistorySlack(`Nhà tuyển dụng *${user.email} - ${user.phone} - #${user._id}* vừa tạo thông tin công ty | ${edit.name} - ${edit._id} | vào lúc ${formatDate_VN(edit.dateCreate)}`)

        const addCoin = await coinService.plusCoin(user, coinModule.JOB.CREATE_JOB, ip, `Cộng ${coinModule.JOB.CREATE_JOB} xu từ việc đăng ký thông tin công ty`, `Nhà tuyển dụng vừa được cộng ${coinModule.JOB.CREATE_JOB} xu từ việc đăng ký thông tin công ty vào lúc ${formatDate_VN(dateNow)}`)

        if (!addCoin) {
            setMessage('Lỗi giao dịch xu!')
            return false;
        }

        setMessage('Thêm thông tin công ty thành công!')
        return edit

    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const edit = async(body, query, params, files, user, ip) => {
    try {
        const arrCarrer = []
        const arrLocation = []
        if (body.careers) {

            body.careers.split(',').forEach(arr => {
                if (arr != '') {
                    arrCarrer.push(arr)
                }
            })
        }

        if (body.locations) {

            body.locations.split(',').forEach(arr => {
                if (arr != '') {
                    arrLocation.push(arr)
                }
            })
        }


        const { key } = query
        const { idCompany } = params

        //* validate
        if (key != keyModule.SERVICE.COMPANY) {
            setMessage(INCORRECT('Key'))
            return false
        }

        const company = await companyModel.findOne({ idEmployer: user._id })
        if (!company) {
            setMessage('Bạn chỉ được thông tin của chính mình!')
            return false
        }

        if (files.srcLogo) {
            body.srcLogo = files.srcLogo[0]
        } else {
            body.srcLogo = company.srcLogo
        }

        if (files.srcBanner) {
            body.srcBanner = files.srcBanner[0]
        } else {
            body.srcBanner = company.srcBanner
        }



        body.careers = arrCarrer
        body.locations = arrLocation
        body.dateEdit = dateNow

        const edit = await companyModel.findByIdAndUpdate(idCompany, body)

        //* send slack and save history
        historyService.create({ idEmployer: user._id, content: 'Sửa thông tin công ty', ip, type: typeModule.HISTORY.WORK, role: typeModule.ROLE.EMPLOYER })
        sendHistorySlack(`Nhà tuyển dụng *${user.email} - ${user.phone} - #${user._id}* vừa sửa thông tin công ty | ${edit.name} - ${edit._id} | vào lúc ${formatDate_VN(dateNow)}`)

        setMessage('Sửa thông tin công ty thành công!')
        return edit

    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const getByCompany = async(query, user, ip) => {
    try {

        const { key } = query
        //* validate
        if (key != keyModule.SERVICE.COMPANY) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (!user.isActive || user.isBin) {
            setMessage('Truy cập thất bại do tài khoản đã bị khóa!')
            return false
        }

        const company = await companyModel.findOne({ idEmployer: user._id }).populate('idEmployer')

        return company

    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const getMessage = () => {
    return this.message
}

const setMessage = (message) => {
    this.message = message
}

module.exports = {
    create,
    edit,
    getByCompany,
    getMessage
}