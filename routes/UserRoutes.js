const router = require('express').Router()

const UserController = require('../controllers/UserController')
const User = require('../models/User')

//Middleware
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')


//rotas do postman
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken , imageUpload.single("image"), UserController.editUser)

module.exports = router;