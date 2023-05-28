const { NotFoundError } = require('../core/error.response')
const { transaction } = require('../models/transaction.model')
// const { getProductById } = require('../models/repositories/product.repo')

class TransactionService {
    // START REPO CART
    // tạo giỏ hàng
    // static async createUserTransaction({ user, product, shopId }) {
    //     const query = { transaction_state: 'active', transaction_ShopId: shopId },
    //         updateOrInsert = {
    //             $addToSet: {
    //                 transaction_products: product,
    //                 transaction_userId: user,
    //             },
    //         },
    //         options = {
    //             upsert: true,
    //             new: true,
    //         }

    //     return await transaction.create(query, updateOrInsert, options)
    // }

    static async createUserTransaction({ user, product, shopId }) {
        const newTransaction = new transaction({
            transaction_state: 'active',
            transaction_ShopId: shopId,
            transaction_products: [product],
            transaction_userId: [user]
        });

        try {
            const createdTransaction = await newTransaction.save();
            return createdTransaction;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create user transaction.');
        }
    }

    /*
        shop_order_ids = [
            {
                shopId,
                item_products: [
                    {
                        quantity,
                        price,
                        shopId,
                        old_quntity,
                        productId
                    }
                ]
            }
        ]
    */


    static async deleteUserTransaction({ userId, productId }) {

        console.log({ userId })
        console.log({ productId })

        const query = { cart_userId: userId, cart_state: 'active' },
            updateSet = {
                $pull: {
                    cart_products: {
                        productId,
                    },
                },
            }

        const deleteCart = await cart.updateOne(query, updateSet)

        return deleteCart
    }

    static async getListUserTransaction({ userId }) {
        console.log(userId)
        return await cart
            .findOne({
                cart_userId: userId,
            })
            .lean()
    }

    static async getListUserTransactiontByShop({ shopId }) {
        console.log(shopId)
        return await transaction
            .find({
                transaction_ShopId: shopId,
            })
            .lean()
    }
}

module.exports = TransactionService
