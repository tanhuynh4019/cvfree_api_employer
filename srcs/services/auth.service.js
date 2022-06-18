const moment = require('moment')
moment().format();

const keyModule = require('../modules/key.module')
const { INCORRECT } = require('../modules/message.module')
const { formatDate_VN } = require('../modules/format.module')
const typeModule = require('../modules/type.module')

const employerModel = require('../models/employer.model')

const { hashPassword, comparePassword } = require('../utils/bcrypt.ultil')
const { endcodedToken } = require('../utils/jwt.ultil')
const { sendHistorySlack } = require('../utils/slack.util')

const historyService = require('../services/history.service')

const register = async(body, query, ip) => {

    try {
        const { key } = query

        //* validate
        if (key != keyModule.SERVICE.AUTH) {
            setMessage(INCORRECT('Key'))
            return false
        }

        //* perform
        const passwordHashed = await hashPassword(body.password)
        body.password = passwordHashed

        const create = await employerModel.create(body)
        const createToken = await endcodedToken(create._id)

        //* send slack and save history
        sendHistorySlack(`Nhà tuyển dụng *${create.email} - ${create.phone} - #${create._id}* vừa tạo tài khoản nhà tuyển dụng vào lúc ${formatDate_VN(create.dateCreate)}`)
        historyService.create({ idEmployer: create._id, content: 'Đăng ký', ip, type: typeModule.HISTORY.ACCOUNT, role: typeModule.ROLE.EMPLOYER })

        setMessage('Đăng ký thành công!')
        return {
            token: createToken
        }

    } catch (error) {
        setMessage(error.code === 11000 ? 'E-mail đã tồn tại!' : error.message);
        return false
    }
}

const login = async(query, user, ip) => {
    try {
        const { key } = query

        //* validate
        if (key != keyModule.SERVICE.AUTH) {
            setMessage(INCORRECT('Key'))
            return false
        }

        //* perform
        const createToken = await endcodedToken(user._id)

        //* send slack and save history
        historyService.create({ idEmployer: user._id, content: 'Đăng nhập', ip, type: typeModule.HISTORY.ACCOUNT, role: typeModule.ROLE.EMPLOYER })
        sendHistorySlack(`Nhà tuyển dụng *${user.email} - ${user.phone} - #${user._id}* vừa đăng nhập vào lúc ${formatDate_VN(Date.now())}`)

        setMessage('Đăng nhập thành công!')


        return {
            token: createToken
        }

    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const secret = async(query, user) => {
    try {
        const { key } = query

        //* validate
        if (key != keyModule.SERVICE.AUTH) {
            setMessage(INCORRECT('Key'))
            return false
        }

        //* perform
        const { email, fullname, phone, gender, company, position, workLocation, district, accountSkype, accountZalo, coin, avatar } = user
        const showUser = {
            email,
            fullname,
            phone,
            gender,
            company,
            position,
            workLocation,
            district,
            accountSkype,
            accountZalo,
            coin,
            avatar
        }

        return showUser
    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const changePassword = async(body, query, user, ip) => {
    try {
        const { key } = query
        const { passwordOld, passwordNew, isLogOut } = body
        const dateNow = Date.now()

        //* validate
        if (key != keyModule.SERVICE.AUTH) {
            setMessage(INCORRECT('Key'))
            return false
        }

        if (!await comparePassword(passwordOld, user.password)) {

            if (user.numberErrorChangePassword > 3) {

                if (dateNow > user.dateAllowChangePassword) {
                    await employerModel.findByIdAndUpdate(user._id, { numberErrorChangePassword: 0, dateAllowChangePassword: null })
                }

                if (!user.dateAllowChangePassword) {
                    await employerModel.findByIdAndUpdate(user._id, { dateAllowChangePassword: moment(dateNow).add(30, 'm') })
                }

                setMessage(`Bạn đã nhập mật khẩu cũ quá nhiều lần, xin vui lòng quay lại sau vài phút!`)
                return false
            }

            await employerModel.findByIdAndUpdate(user._id, { numberErrorChangePassword: user.numberErrorChangePassword + 1 })


            setMessage('Mật khẩu cũ không đúng!')
            return false
        }

        if (await comparePassword(passwordNew, user.password)) {
            setMessage('Bạn không được sử dụng mật khẩu hiện tại!')
            return false
        }

        //* perform
        const passwordNewHashed = await hashPassword(passwordNew)
        const bodyNew = {
            dateChangePassword: dateNow,
            password: passwordNewHashed
        }

        const edit = await employerModel.findByIdAndUpdate(user._id, bodyNew)
        let createToken

        //* send slack and save history
        historyService.create({ idEmployer: edit._id, content: 'Đổi mật khẩu', ip, type: typeModule.HISTORY.ACCOUNT, role: typeModule.ROLE.EMPLOYER })
        sendHistorySlack(`Nhà tuyển dụng *${edit.email} - ${edit.phone} - #${edit._id}* vừa đổi mật khẩu vào lúc ${formatDate_VN(dateNow)}`)

        if (isLogOut) {
            createToken = null
        } else {
            createToken = await endcodedToken(edit._id)
        }

        setMessage('Đổi mật khẩu thành công!')
        return { token: createToken }
    } catch (error) {
        setMessage(error.message);
        return false
    }
}

const logOut = async(query, user, ip) => {
    const { key } = query
    const dateNow = Date.now()

    //* validate
    if (key != keyModule.SERVICE.AUTH) {
        setMessage(INCORRECT('Key'))
        return false
    }

    //* send slack and save history
    historyService.create({ idEmployer: user._id, content: 'Đăng xuất', ip, type: typeModule.HISTORY.ACCOUNT, role: typeModule.ROLE.EMPLOYER })
    sendHistorySlack(`Nhà tuyển dụng *${user.email} - ${user.phone} - #${user._id}* vừa đăng xuất vào lúc ${formatDate_VN(dateNow)}`)

    setMessage('Đăng xuất thành công!')
    return { token: null }
}

const editInfo = async(body, query, user, ip) => {
    const { key } = query
    const dateNow = Date.now()

    //* validate
    if (key != keyModule.SERVICE.AUTH) {
        setMessage(INCORRECT('Key'))
        return false
    }

    //* perform
    body.dateEdit = dateNow
    const edit = await employerModel.findByIdAndUpdate(user._id, body)

    //* send slack and save history
    historyService.create({ idEmployer: edit._id, content: 'Cập nhật thông tin', ip, type: typeModule.HISTORY.ACCOUNT, role: typeModule.ROLE.EMPLOYER })
    sendHistorySlack(`Nhà tuyển dụng *${edit.email} - ${edit.phone} - #${edit._id}* vừa cập nhật thông tin vào lúc ${formatDate_VN(dateNow)}`)

    setMessage('Cập nhật thông tin thành công!')
    return {}
}

const getMessage = () => {
    return this.message
}

const setMessage = (message) => {
    this.message = message
}

module.exports = {
    register,
    login,
    secret,
    changePassword,
    getMessage,
    logOut,
    editInfo
}