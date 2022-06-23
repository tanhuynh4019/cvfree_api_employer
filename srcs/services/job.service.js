const keyModule = require('../modules/key.module')
const { formatDate_VN } = require('../modules/format.module')
const { INCORRECT } = require('../modules/message.module')
const typeModule = require('../modules/type.module')
const coinModule = require('../modules/coin.module')

const jobModel = require('../models/job.model')
const companyModel = require('../models/company.model')

const { sendHistorySlack } = require('../utils/slack.util')

const historyService = require('../services/history.service')
const coinService = require('../services/coin.service')

const dateNow = Date.now()

const getJob = async(query, user, ip) => {
    try {

        const { key } = query
        //* validate
        if (key != keyModule.SERVICE.JOB) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (!user.isActive || user.isBin) {
            setMessage('Truy cập thất bại do tài khoản đã bị khóa!')
            return false
        }

        let publics = []
        let drafts = []
        let bins = []

        const company = await companyModel.findOne({ idEmployer: user._id })
        if (!company) {
            setMessage('Chưa có công ty!')
            return false
        }

        const jobs = await jobModel.find({ idCompany: company._id, isDelete: false })

        jobs.forEach((job) => {
            if (job.isActive && !job.isBin) {
                publics.unshift(job)
            } else if (!job.isActive && !job.isBin) {
                drafts.unshift(job)
            } else {
                bins.unshift(job)
            }
        })

        return {
            publics,
            drafts,
            bins
        }

    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const create = async(body, query, user, ip) => {

    try {

        const sideProfessions = []
        const skills = []
        const emails = []
        if (body.sideProfessions) {

            body.sideProfessions.split(',').forEach(arr => {
                if (arr != '') {
                    sideProfessions.push(arr)
                }
            })
        }

        if (body.skills) {

            body.skills.split(',').forEach(arr => {
                if (arr != '') {
                    skills.push(arr)
                }
            })
        }

        if (body.emails) {

            body.emails.split(',').forEach(arr => {
                if (arr != '') {
                    emails.push(arr)
                }
            })
        }

        const { key } = query
        //* validate
        if (key != keyModule.SERVICE.JOB) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (!user.isActive || user.isBin) {
            setMessage('Truy cập thất bại do tài khoản đã bị khóa!')
            return false
        }

        if (user.coin < 100) {
            setMessage('Không đủ coin để đăng bài, vui lòng nạp thêm!')
            return false
        }

        const company = await companyModel.findOne({ idEmployer: user._id })
        if (!company) {
            setMessage('Chưa có công ty!')
            return false
        }

        body.idCompany = company._id
        body.sideProfessions = sideProfessions
        body.skills = skills
        body.emails = emails

        const create = await jobModel.create(body)


        //* send slack and save history
        historyService.create({ idEmployer: user._id, content: `Thêm việc làm - ${create.name}`, ip, type: typeModule.HISTORY.WORK, role: typeModule.ROLE.EMPLOYER })
        sendHistorySlack(`Nhà tuyển dụng *${user.email} - ${user.phone} - #${user._id}* vừa thêm việc làm | ${create.name} - ${create._id} | vào lúc ${formatDate_VN(create.dateCreate)}`)

        const minusCoin = await coinService.minusCoin(user, coinModule.JOB.CREATE_JOB_MINUS, ip, `Trừ ${coinModule.JOB.CREATE_JOB_MINUS} xu từ việc thêm việc làm ${create.name}`, `Nhà tuyển dụng vừa được trừ ${coinModule.JOB.CREATE_JOB_MINUS} xu từ việc thêm việc làm ${create.name} vào lúc ${formatDate_VN(dateNow)}`)

        if (!minusCoin) {
            setMessage('Lỗi giao dịch xu!')
            return false;
        }

        setMessage('Thêm việc làm thành công!')
        return create
    } catch (error) {
        setMessage(error.message);
        return false
    }

}

const edit = async(body, query, params, user, ip) => {

    try {

        const { slug, idJob } = params
        const sideProfessions = []
        const skills = []
        const emails = []
        if (body.sideProfessions) {

            body.sideProfessions.split(',').forEach(arr => {
                if (arr != '') {
                    sideProfessions.push(arr)
                }
            })
        }

        if (body.skills) {

            body.skills.split(',').forEach(arr => {
                if (arr != '') {
                    skills.push(arr)
                }
            })
        }

        if (body.emails) {

            body.emails.split(',').forEach(arr => {
                if (arr != '') {
                    emails.push(arr)
                }
            })
        }

        const { key } = query
        //* validate
        if (key != keyModule.SERVICE.JOB) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (!user.isActive || user.isBin) {
            setMessage('Truy cập thất bại do tài khoản đã bị khóa!')
            return false
        }

        const company = await companyModel.findOne({ idEmployer: user._id })
        if (!company) {
            setMessage('Chưa có công ty!')
            return false
        }

        body.idCompany = company._id
        body.sideProfessions = sideProfessions
        body.skills = skills
        body.emails = emails
        body.dateEdit = dateNow

        const edit = await jobModel.findOneAndUpdate({ slug, _id: idJob }, body)


        //* send slack and save history
        historyService.create({ idEmployer: user._id, content: `Sửa việc làm - ${edit.name}`, ip, type: typeModule.HISTORY.WORK, role: typeModule.ROLE.EMPLOYER })
        sendHistorySlack(`Nhà tuyển dụng *${user.email} - ${user.phone} - #${user._id}* vừa sửa việc làm | ${edit.name} - ${edit._id} | vào lúc ${formatDate_VN(dateNow)}`)

        setMessage('Sửa việc làm thành công!')
        return edit
    } catch (error) {
        setMessage(error.message);
        return false
    }

}

const getBy = async(query, params, user, ip) => {
    try {
        const { slug, idJob } = params
        const { key } = query
        //* validate
        if (key != keyModule.SERVICE.JOB) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (!user.isActive || user.isBin) {
            setMessage('Truy cập thất bại do tài khoản đã bị khóa!')
            return false
        }

        const job = await jobModel.findOne({ slug, _id: idJob })
        return job
    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const bin = async(query, params, user, ip) => {
    try {
        const { slug, idJob } = params

        const { key } = query
        //* validate
        if (key != keyModule.SERVICE.JOB) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (!user.isActive || user.isBin) {
            setMessage('Truy cập thất bại do tài khoản đã bị khóa!')
            return false
        }

        const bin = await jobModel.findOne({ slug, _id: idJob })
        bin.isBin = true
        bin.save()

        //* send slack and save history
        historyService.create({ idEmployer: user._id, content: `Xóa việc làm - ${bin.name} vào thùng rác`, ip, type: typeModule.HISTORY.WORK, role: typeModule.ROLE.EMPLOYER })
        sendHistorySlack(`Nhà tuyển dụng *${user.email} - ${user.phone} - #${user._id}* vừa xóa việc làm | ${bin.name} - ${bin._id} | vào thùng rác lúc ${formatDate_VN(dateNow)}`)

        setMessage('Xóa việc làm vào thùng rác thành công!')
        return bin
    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const restore = async(query, params, user, ip) => {
    try {
        const { slug, idJob } = params

        const { key } = query
        //* validate
        if (key != keyModule.SERVICE.JOB) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (!user.isActive || user.isBin) {
            setMessage('Truy cập thất bại do tài khoản đã bị khóa!')
            return false
        }

        const restore = await jobModel.findOne({ slug, _id: idJob })
        restore.isBin = false
        restore.save()

        //* send slack and save history
        historyService.create({ idEmployer: user._id, content: `Khôi phục việc làm - ${restore.name}`, ip, type: typeModule.HISTORY.WORK, role: typeModule.ROLE.EMPLOYER })
        sendHistorySlack(`Nhà tuyển dụng *${user.email} - ${user.phone} - #${user._id}* vừa khôi phục việc làm | ${restore.name} - ${restore._id} | vào lúc ${formatDate_VN(dateNow)}`)

        setMessage('Khôi phục thành công!')
        return restore
    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const virtualDelete = async(query, params, user, ip) => {
    try {
        const { slug, idJob } = params

        const { key } = query
        //* validate
        if (key != keyModule.SERVICE.JOB) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (!user.isActive || user.isBin) {
            setMessage('Truy cập thất bại do tài khoản đã bị khóa!')
            return false
        }

        const virtualDelete = await jobModel.findOne({ slug, _id: idJob })
        virtualDelete.isDelete = true
        virtualDelete.save()

        //* send slack and save history
        historyService.create({ idEmployer: user._id, content: `Xóa vĩnh viển việc làm - ${virtualDelete.name}`, ip, type: typeModule.HISTORY.WORK, role: typeModule.ROLE.EMPLOYER })
        sendHistorySlack(`Nhà tuyển dụng *${user.email} - ${user.phone} - #${user._id}* vừa xóa việc làm | ${virtualDelete.name} - ${virtualDelete._id} | vào lúc ${formatDate_VN(dateNow)}`)

        setMessage('Xóa thành công!')
        return restore
    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const isActive = async(query, params, user, ip) => {
    try {
        const { slug, idJob } = params

        const { key } = query
        //* validate
        if (key != keyModule.SERVICE.JOB) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (!user.isActive || user.isBin) {
            setMessage('Truy cập thất bại do tài khoản đã bị khóa!')
            return false
        }

        const isActive = await jobModel.findOne({ slug, _id: idJob })
        isActive.isActive = !isActive.isActive
        isActive.save()

        if (!isActive.isActive) {

            //* send slack and save history
            historyService.create({ idEmployer: user._id, content: `Ngừng hiển thị việc làm - ${isActive.name}`, ip, type: typeModule.HISTORY.WORK, role: typeModule.ROLE.EMPLOYER })
            sendHistorySlack(`Nhà tuyển dụng *${user.email} - ${user.phone} - #${user._id}* vừa ngừng hiển thị việc làm | ${isActive.name} - ${isActive._id} | vào lúc ${formatDate_VN(dateNow)}`)


            setMessage(`Ngừng hiển thị tin tuyển dụng [${isActive.name}] thành công!`)
        } else {

            //* send slack and save history
            historyService.create({ idEmployer: user._id, content: `Khơi chạy việc làm - ${isActive.name}`, ip, type: typeModule.HISTORY.WORK, role: typeModule.ROLE.EMPLOYER })
            sendHistorySlack(`Nhà tuyển dụng *${user.email} - ${user.phone} - #${user._id}* vừa khởi chạy việc làm| ${isActive.name} - ${isActive._id} | vào lúc ${formatDate_VN(dateNow)}`)

            setMessage(`Khởi chạy tin tuyển dụng [${isActive.name}] thành công!`)
        }
        return isActive
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
    getJob,
    isActive,
    create,
    restore,
    getBy,
    edit,
    bin,
    virtualDelete,
    getMessage
}