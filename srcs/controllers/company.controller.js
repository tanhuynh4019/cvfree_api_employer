const companyService = require('../services/company.service')

const createCompany = async(req, res) => {
    try {
        const company = await companyService.create(req.body, req.query, req.files, req.user, req.ip)
        if (company) {
            res.status(200).json({ status: 200, error: false, message: companyService.getMessage(), data: company })
        } else {
            res.status(400).json({ status: 400, error: true, message: companyService.getMessage() })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: true, message: error.message })
    }
}

module.exports = {
    createCompany
}