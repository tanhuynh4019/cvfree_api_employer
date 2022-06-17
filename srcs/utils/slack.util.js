const axios = require('axios')

const sendHistorySlack = async(content) => {
    await axios.post('https://hooks.slack.com/services/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', {
        text: content
    })
}

module.exports = {
    sendHistorySlack
}