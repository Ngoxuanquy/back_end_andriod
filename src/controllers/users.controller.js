const { SuccessResponse } = require('../core/success.response')
const UserService = require('../services/users.service')

class UserController {
    static async addToUser(req, res, next) {
        new SuccessResponse({
            message: 'Create new transaction success',
            metadata: await UserService.createUsers(req.body),
        }).send(res)
    }

    static async delete(req, res, next) {
        new SuccessResponse({
            message: 'deleted Cart success',
            metadata: await UserService.deleteUser(req.body),
        }).send(res)
    }

    static async listToUser(req, res, next) {
        // console.log(req.params)
        new SuccessResponse({
            message: 'getList User success',
            metadata: await UserService.getListUser(req.params),
        }).send(res)
    }

    static async updateUser(req, res, next) {
        console.log(req.params)
        new SuccessResponse({
            message: 'getList Cart success',
            metadata: await UserService.updateUser(req.params),
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

module.exports = UserController