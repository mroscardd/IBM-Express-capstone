const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/AuthMiddleware.js')
const ApiController = require('../controllers/apiController.js')


router.post('/login', ApiController.login)
router.post('/register', ApiController.register)
router.get('/logout', ApiController.logout)
router.get('/private', verifyToken, ApiController.private)


module.exports = router