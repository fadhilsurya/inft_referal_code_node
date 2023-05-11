const router = require('express').Router()
const userRouter = require('./user.router')
const referalRouter = require('./referal.router')
const sortingRouter = require('./sorting.router')

router.use('/user', userRouter)
router.use('/referal', referalRouter)
router.use('/sorting', sortingRouter)

module.exports = router