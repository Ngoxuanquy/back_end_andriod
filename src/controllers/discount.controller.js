const { SuccessResponse } = require('../core/success.response')
const DiscountService = require('../services/discount.service')

class DiscountController {
    static createDiscount = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create new discount success',
            metadata: await DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId,
            }),
        }).send(res)
    }

    static getAllProductWithDiscountCode = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get all discount success',
            metadata: await DiscountService.getAllProductWithDiscountCode({
                ...req.body,
                shopId: req.user.userId,
            }),
        }).send(res)
    }

    static getAllDiscountCodesByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'get All Discount Codes By Shop success',
            metadata: await DiscountService.getAllDiscountCodesByShop({
                ...req.body,
                shopId: req.user.userId,
            }),
        }).send(res)
    }
}

module.exports = DiscountController
