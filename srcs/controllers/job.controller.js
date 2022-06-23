const jobService = require('../services/job.service')

const getJob = async(req, res) => {
    try {
        const job = await jobService.getJob(req.query, req.user, req.ip)
        if (job) {
            res.status(200).json({ status: 200, error: false, message: jobService.getMessage(), data: job })
        } else {
            res.status(400).json({ status: 400, error: true, message: jobService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const createJob = async(req, res) => {
    try {
        const job = await jobService.create(req.body, req.query, req.user, req.ip)
        if (job) {
            res.status(200).json({ status: 200, error: false, message: jobService.getMessage(), data: job })
        } else {
            res.status(400).json({ status: 400, error: true, message: jobService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const editJob = async(req, res) => {
    try {
        const job = await jobService.edit(req.body, req.query, req.params, req.user, req.ip)
        if (job) {
            res.status(200).json({ status: 200, error: false, message: jobService.getMessage(), data: job })
        } else {
            res.status(400).json({ status: 400, error: true, message: jobService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const restoreJob = async(req, res) => {
    try {
        const job = await jobService.restore(req.query, req.params, req.user, req.ip)
        if (job) {
            res.status(200).json({ status: 200, error: false, message: jobService.getMessage(), data: job })
        } else {
            res.status(400).json({ status: 400, error: true, message: jobService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const binJob = async(req, res) => {
    try {
        const job = await jobService.bin(req.query, req.params, req.user, req.ip)
        if (job) {
            res.status(200).json({ status: 200, error: false, message: jobService.getMessage(), data: job })
        } else {
            res.status(400).json({ status: 400, error: true, message: jobService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const deleteJob = async(req, res) => {
    try {
        const job = await jobService.virtualDelete(req.query, req.params, req.user, req.ip)
        if (job) {
            res.status(200).json({ status: 200, error: false, message: jobService.getMessage(), data: job })
        } else {
            res.status(400).json({ status: 400, error: true, message: jobService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const getByJob = async(req, res) => {
    try {
        const job = await jobService.getBy(req.query, req.params, req.user, req.ip)
        if (job) {
            res.status(200).json({ status: 200, error: false, message: jobService.getMessage(), data: job })
        } else {
            res.status(400).json({ status: 400, error: true, message: jobService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

const isActiveJob = async(req, res) => {
    try {
        const job = await jobService.isActive(req.query, req.params, req.user, req.ip)
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
    getJob,
    isActiveJob,
    getByJob,
    editJob,
    binJob,
    createJob,
    restoreJob,
    deleteJob
}