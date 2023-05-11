const router = require('express').Router()
const userRouter = require('./user.router')
const referalRouter = require('./referal.router')

router.use('/user', userRouter)
router.use('/referal', referalRouter)


module.exports = router