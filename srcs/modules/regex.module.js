module.exports = {
    new: {
        phone_vn: /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
        email: '^[a-zA-Z0-9]{5,50}$'
    },
    old: {
        phone_vn: '',
        email: ''
    },
}