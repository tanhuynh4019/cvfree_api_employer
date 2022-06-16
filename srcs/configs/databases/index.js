const mongoose = require('mongoose')

const connectDatabase = mongoose.connect(process.env.DB_URI).then((client) => {
    console.log('👍 Database connection successful!')
}).catch(() => console.log('😥 Database connection failed!'));

module.exports = {
    connectDatabase
}