const multer = require('multer')

const uploadImage = (url, key) => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {

            cb(null, url);
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
        }
    })

    const fileFilter = function(req, file, cb) {

        const whitelist = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp'
        ]

        if (!whitelist.includes(file.mimetype)) {
            return cb('Định dạng ảnh phải là png, jpeg, jpg, webp')
        }

        cb(null, true)
    }

    return multer({ storage, fileFilter }).single(key)
}

const uploadNone = () => {
    return multer().none()
}

module.exports = {
    uploadImage,
    uploadNone
}