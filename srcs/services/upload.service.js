const keyModule = require('../modules/key.module')
const { INCORRECT } = require('../modules/message.module')

const { formatDate_VN } = require('../modules/format.module')
const employerModel = require('../models/employer.model')
const typeModule = require('../modules/type.module')

const { sendHistorySlack } = require('../utils/slack.util')

const historyService = require('../services/history.service')

const uploadModel = require('../models/upload.model')

const uploadAvatar = async(query, file, user, ip) => {
    try {
        const { key } = query
        const dateNow = Date.now()

        //* validate
        if (key != keyModule.SERVICE.UPLOAD) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (!file) {
            setMessage('Vui lòng chọn hình ảnh!')
            return false
        }

        const editAvatarEmployer = await employerModel.findByIdAndUpdate(user._id, { avatar: file })

        const bodyUpload = {
            idEmployer: editAvatarEmployer._id,
            file
        }

        await uploadModel.create(bodyUpload)

        //* send slack and save history
        historyService.create({ idEmployer: editAvatarEmployer._id, content: 'Đổi ảnh đại diện!', ip, type: typeModule.HISTORY.EMPLOYER })
        sendHistorySlack(`Nhà tuyển dụng *${editAvatarEmployer.email} - ${editAvatarEmployer.phone} - #${editAvatarEmployer._id}* vừa đổi ảnh đại diện vào lúc ${formatDate_VN(dateNow)}`)

        setMessage('Thêm ảnh đại diện thành công!');
        return {
            vavatar: file.filename
        }
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
    uploadAvatar,
    getMessage
}