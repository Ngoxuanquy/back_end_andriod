const express = require('express')
const { authenticationV2 } = require('../../auth/authUtils')
const asyncHandler = require('../../helpers/asyncHandle')
const CartController = require('../../controllers/cart.controller')

const router = express.Router()


// authentication

router.use(authenticationV2)

router.post('/', asyncHandler(CartController.addToCart))
router.post('/update', asyncHandler(CartController.update))
router.delete('/', asyncHandler(CartController.delete))
router.get('/shopId/:shopId', asyncHandler(CartController.listToCartByShop))
router.get('/', asyncHandler(CartController.listToCart))



module.exports = router
