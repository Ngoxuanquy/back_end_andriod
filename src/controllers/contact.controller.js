const { SuccessResponse } = require('../core/success.response')
const ContactService = require('../services/contact.service')

class ContactController {
    static async addToContact(req, res, next) {
        new SuccessResponse({
            message: 'success',
            metadata: await ContactService.createUserTransaction(req.body),
        }).send(res)
    }

    static async updateTransaciton(req, res, next) {
        new SuccessResponse({
            message: 'success',
            metadata: await ContactService.updateTransaciton(req.params),
        }).send(res)
    }

    static async delete(req, res, next) {
        new SuccessResponse({
            message: 'deleted Cart success',
            metadata: await ContactService.deleteUserTransaction(req.body),
        }).send(res)
    }

    static async listToContact(req, res, next) {
        new SuccessResponse({
            message: 'getList Cart success',
            metadata: await ContactService.getListUserTransaction(req.params),
        }).send(res)
    }

    static async listToContactByShop(req, res, next) {
        console.log(req.params)
        new SuccessResponse({
            message: 'getList Cart success',
            metadata: await ContactService.getListUserTransactiontByShop(req.params),
        }).send(res)
    }
}

module.exports = ContactController
