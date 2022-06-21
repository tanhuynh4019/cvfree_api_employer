const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy

const employerModel = require('../models/employer.model')

const {
    ExtractJwt
} = require('passport-jwt')

const {
    JWT_SECRET
} = require('../configs/jwt')

passport.use(new localStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    try {
        const employer = await employerModel.findOne({
            email
        })
        if (!employer) return done(null, false)

        const isCorrectPassword = await employer.isValidPassword(password)
        if (!isCorrectPassword) return done(null, false)
        done(null, employer)
    } catch (error) {
        done(error, false)
    }
}))

passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try {
        const employer = await employerModel.findById(payload.sub)

        if (!employer) return done(null, false)
        if (!employer.isActive) return done(null, false)

        done(null, employer);
    } catch (error) {
        done(error, false);
    }
}))