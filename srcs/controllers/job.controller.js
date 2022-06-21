const jobService = require('../services/job.service')

const getJob = async(req, res) => {
    try {
        const job = await jobService.getJob(req.query, req.user, req.ip)
        console.log(job);
        if (job) {
            res.status(200).json({ status: 200, error: false, message: jobService.getMessage(), data: job })
        } else {
            res.status(400).json({ status: 400, error: true, message: jobService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

module.exports = {
    getJob
}