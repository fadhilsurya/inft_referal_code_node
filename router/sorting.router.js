const router = require('express').Router()
const { inputSorting } = require('../controller/sorting.controller')

router.post('/', inputSorting)


module.exports = router