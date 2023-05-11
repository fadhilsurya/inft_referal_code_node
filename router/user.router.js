const router = require('express').Router()
const { createAccount, login } = require('../controller/user.controller')

router.post('/register', createAccount)
router.post('/login', login)


module.exports = router