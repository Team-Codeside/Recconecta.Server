const router = require ('express').Router()

const EventoController = require('../controllers/EventoController')

//Middleware
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')

router.post('/create' , verifyToken,imageUpload.array('images'), EventoController.create)

//Resgatando todos os eventos

router.get('/', EventoController.getAll) //Rota pública
router.get('/myeventos', verifyToken, EventoController.getAllUserEventos)//resgatando todos os eventos do usúario
router.get('/myparticipantes', verifyToken, EventoController.getAllUserPaticipantes)
router.get('/:id', EventoController.getEventoById)

module.exports = router