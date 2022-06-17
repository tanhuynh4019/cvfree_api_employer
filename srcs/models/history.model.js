const mongoose = require('mongoose')
const historySchema = mongoose.Schema({
    idEmployer: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    ip: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    dateCreate: {
        type: Date,
        default: Date.now
    },
    type: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('History', historySchema);