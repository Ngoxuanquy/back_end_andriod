const express = require('express')
const { authenticationV2 } = require('../../auth/authUtils')
const asyncHandler = require('../../helpers/asyncHandle')
const ThiController = require('../../controllers/thi.controller')

const router = express.Router()


// authentication

// router.use(authenticationV2)

router.get('/createUsers', ThiController.createUsers)
router.get('/', ThiController.getList)

router.post('/update', ThiController.updateUser)
router.post('/updateUn/:id', asyncHandler(ThiController.updateUserUn))





module.exports = router
