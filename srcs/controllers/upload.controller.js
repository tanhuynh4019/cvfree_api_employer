 const uploadService = require('../services/upload.service')

 const uploadAvatar = async(req, res) => {
     try {
         const upload = await uploadService.uploadAvatar(req.query, req.file, req.user, req.ip)
         if (upload) {
             res.status(200).json({ status: 200, error: true, message: uploadService.getMessage(), data: upload })
         } else {
             res.status(400).json({ status: 400, error: false, message: uploadService.getMessage() })
         }
     } catch (error) {
         res.status(400).json({ status: 400, error: false, message: error.message })
     }
 }

 module.exports = {
     uploadAvatar
 }