const router = require('express').Router()
const { createReferalCode, getReferalCode, updateReferalOne, softDelete } = require('../controller/referal.controller')

router.post('/', createReferalCode)
router.get('/', getReferalCode)
router.put('/:id', updateReferalOne)
router.delete('/:id', softDelete)

module.exports = router