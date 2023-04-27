const express = require('express')
const { authenticationV2 } = require('../../auth/authUtils')
const asyncHandler = require('../../helpers/asyncHandle')
const DiscountController = require('../../controllers/discount.controller')

const router = express.Router()

// authentication

router.use(authenticationV2)

router.get('/getAllDiscountCodesByShop', asyncHandler(DiscountController.getAllDiscountCodesByShop))
router.get('/getAllProductWithDiscountCode', asyncHandler(DiscountController.getAllProductWithDiscountCode))
router.post('/create', asyncHandler(DiscountController.createDiscount))

module.exports = router
