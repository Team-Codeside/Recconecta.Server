const router = require ('express').Router()

const EventoController = require('../controllers/EventoController')

//Middleware
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')

router.post('/create' , verifyToken,imageUpload.array('images'), EventoController.create)

//Resgatando todos os eventos

router.get('/', EventoController.getAll) //Rota pública
router.get('/myeventos', verifyToken, EventoController.getAllUserEventos)//resgatando todos os eventos do usúario
router.get('/myparticipantes', verifyToken, EventoController.getAllUserPaticipantes)//inscrição nos eventos
router.get('/:id', EventoController.getEventoById)//url dinânmica dos eventos
router.delete('/:id', verifyToken, EventoController.removeEventoById)

module.exports = router