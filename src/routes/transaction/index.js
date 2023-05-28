const express = require('express')
const { authenticationV2 } = require('../../auth/authUtils')
const asyncHandler = require('../../helpers/asyncHandle')
const TransactionController = require('../../controllers/transaction.controller')

const router = express.Router()


// authentication

router.use(authenticationV2)

router.post('/', asyncHandler(TransactionController.addToTransaction))
router.post('/update', asyncHandler(TransactionController.update))
// router.delete('/', asyncHandler(TransactionController.d))
router.get('/shopId/:shopId', asyncHandler(TransactionController.listToTransactionByShop))
router.get('/', asyncHandler(TransactionController.listToTransaction))



module.exports = router
