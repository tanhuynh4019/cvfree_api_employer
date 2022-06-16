// true. [text] không tồn tại!
// false. Không tồn tại [text] này!
const REQUIRED = (text, isType) => {
    return isType ? `${text} không tồn tại!` : `Không tồn tại ${text} này!`
}

const INCORRECT = (text) => {
    return `${text} không đúng!`
}

const INVALID = (text) => {
    return `${text} không hợp lệ!`
}

const NOTTRUE = (text) => {
    return `${text} không đúng!`
}

const EMPTY = (text) => {
    return `${text} không được để trống!`
}

module.exports = {
    REQUIRED,
    INCORRECT,
    INVALID,
    EMPTY,
    NOTTRUE
}