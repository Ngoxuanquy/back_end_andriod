const { convertToObjectIdMongodb, getSelectData, unGetSelectData } = require('../../utils')
const discountModel = require('../discount.model')

const findDiscount = async ({ code, shopId }) => {
    return await discountModel
        .findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongodb(shopId),
        })
        .lean()
}

const updateDiscountById = async (discountId) => {}

const findAllDiscountCodeSelect = async ({ limit = 50, page = 1, sort = 'ctime', filter, select, model }) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? { _id: -1 } : { id: 1 }
    const documents = model.find(filter).sort(sortBy).skip(skip).limit(limit).select(getSelectData(select)).lean()

    return documents
}

const findAllDiscountCodeUnSelect = async ({ limit = 50, page = 1, sort = 'ctime', filter, unSelect, model }) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? { _id: -1 } : { id: 1 }
    const documents = model.find(filter).sort(sortBy).skip(skip).limit(limit).select(unGetSelectData(unSelect)).lean()

    return documents
}

module.exports = { findDiscount, findAllDiscountCodeUnSelect, findAllDiscountCodeSelect }
