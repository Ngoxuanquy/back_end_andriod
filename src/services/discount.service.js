const discountModel = require('../models/discount.model')
const { BadRequestError, NotFoundError } = require('../core/error.response')
const { convertToObjectIdMongodb } = require('../utils')
const { findDiscount, findAllDiscountCodeUnSelect } = require('../models/repositories/discount.repo')
const { findAllProducts } = require('./product.service.hightlv')

class DiscountService {
    static async createDiscountCode(payload) {
        const {
            code,
            start_date,
            end_date,
            is_active,
            shopId,
            min_order_value,
            product_ids,
            applies_to,
            name,
            description,
            type,
            value,
            max_value,
            max_uses,
            max_uses_per_user,
            uses_count,
            users_user,
        } = payload

        if (new Date() > new Date(start_date) || new Date() > new Date(end_date)) {
            throw new BadRequestError('Discount code has expried!')
        }

        if (new Date(start_date) > new Date(end_date)) {
            throw new BadRequestError('Start date must be before end date')
        }

        const foundDiscount = await findDiscount({ code, shopId })

        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new BadRequestError('Discount exists!')
        }

        const newDiscount = discountModel.create({
            discount_name: name,
            discount_description: description,
            discoun_type: type,
            discount_value: value,
            discount_code: code,
            discount_start_day: new Date(start_date),
            discount_end_day: new Date(end_date),
            discount_max_uses: max_uses,
            discount_uses_count: uses_count,
            discount_users_used: users_user,
            discount_user_per_used: max_uses_per_user,
            discount_min_order_value: min_order_value || 0,
            discount_max_value: max_value,
            discount_shopId: shopId,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === 'all' ? [] : product_ids,
        })

        return newDiscount
    }

    static async updateDiscountCode(discountId) {}

    static async getAllProductWithDiscountCode({ code, shopId, limit, page }) {
        const foundDiscount = await findDiscount({ code, shopId })

        if (!foundDiscount && !foundDiscount.discount_is_active) {
            return new BadRequestError('Discount not exists!')
        }

        const { discount_applies_to, discount_product_ids } = foundDiscount

        let products
        if (discount_applies_to === 'all') {
            // get all product

            products = findAllProducts({
                filter: {
                    product_shop: convertToObjectIdMongodb(shopId),
                    isPublished: true,
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name'],
            })
        }

        if (discount_applies_to === 'specific') {
            // get the products ids

            products = findAllProducts({
                filter: {
                    _id: { $in: discount_product_ids },
                    isPublished: true,
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name'],
            })
        }

        return products
    }

    static async getAllDiscountCodesByShop({ limit, page, shopId }) {
        const discounts = await findAllDiscountCodeUnSelect({
            limit: +limit,
            page: +page,
            filter: {
                discount_shopId: convertToObjectIdMongodb(shopId),
                discount_is_active: true,
            },
            unSelect: ['__v', 'discount_shopId'],
            model: discountModel,
        })

        return discounts
    }
}

module.exports = DiscountService
