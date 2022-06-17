const mongoose = require('mongoose')
const uploadSchema = mongoose.Schema({
    idEmployer: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    file: {
        type: Object,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
    dateEdit: {
        type: Date,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Upload', uploadSchema)