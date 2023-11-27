const router = require ('express').Router()

const EventoController = require('../controllers/EventoController')

//Middleware
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')

router.post('/create' , verifyToken,imageUpload.array('images'), EventoController.create)

module.exports = router