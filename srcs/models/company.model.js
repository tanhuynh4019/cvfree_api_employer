const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const companySchema = mongoose.Schema({
    srcBanner: {
        type: Object,
    },
    srcLogo: {
        type: Object
    },
    name: {
        type: String
    },
    introduct: {
        type: String
    },
    foundedYear: {
        type: Number
    },
    averageAge: {
        type: Number
    },
    companySizeStart: {
        type: Number
    },
    companySizeEnd: {
        type: Number
    },
    srcVideoYoutube: {
        type: String
    },
    phone: {
        type: String
    },
    website: {
        type: String
    },
    address: {
        type: String
    },
    srcMap: {
        type: String
    },
    career: {
        type: String
    },
    careers: {
        type: Array
    },
    location: {
        type: String
    },
    locations: {
        type: Array
    },
    idEmployer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
    dateEdit: {
        type: Date,
        default: Date.now()
    },
    isBin: {
        type: Boolean,
        default: false
    },
    isBrowser: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: "#004D40"
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    view: {
        type: Number,
        default: 0
    }
})

mongoose.plugin(slug)

module.exports = mongoose.model('Company', companySchema)