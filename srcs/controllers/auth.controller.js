const registerAuth = async(req, res) => {
    res.status(200).json({
        message: 'Đăng ký thành công!',
        error: false,
        body: req.body
    })
}

module.exports = {
    registerAuth
}