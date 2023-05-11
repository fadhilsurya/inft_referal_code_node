const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const routes = require('./router/router')

app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})