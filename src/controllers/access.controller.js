const { CREATED, SuccessResponse } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
    // V1

    // handleRefreshToken = async (req, res, next) => {
    //     new SuccessResponse({
    //         message: 'Get token success',
    //         metadata: await AccessService.handleRefreshToken(req.body.refreshToken),
    //     }).send(res)
    // }

    // V2 fixed

    handleRefreshToken = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get token success',
            metadata: await AccessService.handleRefreshTokenV2({
                refreshToken: req.refreshToken,
                user: req.user,
                keyStore: req.keyStore,
            }),
        }).send(res)
    }

    logout = async (req, res, next) => {
        new SuccessResponse({
            message: 'Logout success',
            metadata: await AccessService.logout(req.keyStore),
        }).send(res)
    }

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body),
        }).send(res)
    }

    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await AccessService.signUp(req.body),
        }).send(res)

        // return res.status(201).json(await AccessService.signUp(req.body))
    }
}

module.exports = new AccessController()
