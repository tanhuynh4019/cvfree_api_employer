//* require npm
const express = require('express')
require('dotenv').config()
const cors = require('cors')

//* require server
const router = require('./routers/router')

const app = express()
const port = 3000

//* config
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//* router
router(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})