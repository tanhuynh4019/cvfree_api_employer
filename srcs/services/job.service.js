const keyModule = require('../modules/key.module')
const { formatDate_VN } = require('../modules/format.module')
const { INCORRECT } = require('../modules/message.module')
const typeModule = require('../modules/type.module')

const jobModel = require('../models/job.model')
const companyModel = require('../models/company.model')

const { sendHistorySlack } = require('../utils/slack.util')

const historyService = require('../services/history.service')
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

        const jobs = await jobModel.find({ idCompany: company._id })

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

const getMessage = () => {
    return this.message
}

const setMessage = (message) => {
    this.message = message
}

module.exports = {
    getJob,
    getMessage
}