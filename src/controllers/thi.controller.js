const { SuccessResponse } = require('../core/success.response')
const ThiService = require('../services/thi.service')

class ThiController {
    static async createUsers(req, res, next) {
        new SuccessResponse({
            message: 'Create new transaction success',
            metadata: await ThiService.createUsers(req.body),
        }).send(res)
    }

    static async getList(req, res, next) {
        new SuccessResponse({
            message: 'deleted Cart success',
            metadata: await ThiService.getList(req.body),
        }).send(res)
    }

    static async listToUser(req, res, next) {
        // console.log(req.params)
        new SuccessResponse({
            message: 'getList User success',
            metadata: await ThiService.getListUser(req.params),
        }).send(res)
    }

    static async updateUser(req, res, next) {
        console.log(req.params)
        new SuccessResponse({
            message: 'getList Cart success',
            metadata: await ThiService.updateUser(req.body),
        }).send(res)
    }

    static async updateUserUn(req, res, next) {
        console.log(req.params)
        new SuccessResponse({
            message: 'getList Cart success',
            metadata: await UserService.updateUserUn(req.params),
        }).send(res)
    }


}

module.exports = ThiController
