const { SuccessResponse } = require('../core/success.response')
const TransactionService = require('../services/transaction.service')

class TransactionController {
    static async addToTransaction(req, res, next) {
        new SuccessResponse({
            message: 'Create new transaction success',
            metadata: await TransactionService.createUserTransaction(req.body),
        }).send(res)
    }

    // // update + or -
    // static async update(req, res, next) {
    //     new SuccessResponse({
    //         message: 'Create new Cart success',
    //         metadata: await CartService.addToCartV2(req.body),
    //     }).send(res)
    // }

    static async delete(req, res, next) {
        new SuccessResponse({
            message: 'deleted Cart success',
            metadata: await TransactionService.deleteUserTransaction(req.body),
        }).send(res)
    }

    static async listToTransaction(req, res, next) {
        console.log(req.query)
        new SuccessResponse({
            message: 'getList Cart success',
            metadata: await TransactionService.getListUserTransaction(req.query),
        }).send(res)
    }

    static async listToTransactionByShop(req, res, next) {
        console.log(req.params)
        new SuccessResponse({
            message: 'getList Cart success',
            metadata: await TransactionService.getListUserTransactiontByShop(req.params),
        }).send(res)
    }
}

module.exports = TransactionController
