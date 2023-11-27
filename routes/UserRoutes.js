const router = require('express').Router()

const UserController = require('../controllers/UserController')
const User = require('../models/User')

//rotas do postman
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)

module.exports = router;