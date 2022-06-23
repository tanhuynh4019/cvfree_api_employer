const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const jobSchema = mongoose.Schema({
    name: {
        type: String
    },
    vacancies: {
        type: String
    },
    workLocation: {
        type: String
    },
    mainJob: {
        type: String
    },
    sideProfessions: [{
        type: Object
    }],
    numberOfRecruitments: {
        type: Number
    },
    workingForm: {
        type: String
    },
    gender: {
        type: String
    },
    level: {
        type: String
    },
    exp: {
        type: String
    },
    currency: {
        type: String
    },
    salaryType: {
        type: String
    },
    salaryTo: {
        type: Number,
        default: 0
    },
    salaryFrom: {
        type: Number,
        default: 0
    },
    jobLocation: {
        type: String
    },
    jobDescription: {
        type: String
    },
    candidateRequirements: {
        type: String
    },
    skills: [{
        type: Object
    }],
    benefit: {
        type: String
    },
    deadline: {
        type: Date
    },
    fullname: {
        type: String
    },
    emails: [{
        type: Object
    }],
    phone: {
        type: String
    },
    idCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    dateEdit: {
        type: Date,
        default: Date.now()
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
    view: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    businessPoints: {
        type: Number,
        default: 0
    },
    isBin: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isBrowser: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
});

mongoose.plugin(slug);
module.exports = mongoose.model('Job', jobSchema);