const express = require('express')
const { authenticationV2 } = require('../../auth/authUtils')
const productController = require('../../controllers/product.controller')
const asyncHandler = require('../../helpers/asyncHandle')

const router = express.Router()

router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct))
router.get('/', asyncHandler(productController.findAllProducts))
router.get('/:product_id', asyncHandler(productController.findProduct))

router.get('/getAll', asyncHandler(productController.getproductAll))


// authentication
router.use(authenticationV2)

// PUT

router.post('/', asyncHandler(productController.createProduct))
router.patch('/:productId', asyncHandler(productController.updateProduct))

//delete
router.post('/delete/:productId', asyncHandler(productController.deleteproductAll))


router.post('/publish/:id', asyncHandler(productController.publicProductByShop))
router.post('/unpublish/:id', asyncHandler(productController.unPublicProductByShop))

// QUERY
router.get('/byId/:id', asyncHandler(productController.getproductById))
router.get('/drafts/all', asyncHandler(productController.getAllDraftForShop))
router.get('/published/all', asyncHandler(productController.getAllPublishForShop))

module.exports = router
