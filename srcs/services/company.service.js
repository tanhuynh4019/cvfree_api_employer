const keyModule = require('../modules/key.module')
const { INCORRECT } = require('../modules/message.module')
const typeModule = require('../modules/type.module')

const companyModel = require('../models/company.model')
const employerModel = require('../models/employer.model')

const { sendHistorySlack } = require('../utils/slack.util')

const historyService = require('../services/history.service')

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

        setMessage('Thêm thông tin công ty thành công!')
        return edit

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
    getMessage
}