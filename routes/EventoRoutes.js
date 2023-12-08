const router = require ('express').Router()

const EventoController = require('../controllers/EventoController')

//Middleware
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')

router.post('/create' , verifyToken,imageUpload.array('images'), EventoController.create)

//Resgatando todos os eventos

router.get('/', EventoController.getAll) //Rota pública (visualizar eventos)
router.get('/myeventos', verifyToken, EventoController.getAllUserEventos)//resgatando todos os eventos do usúario
router.get('/myparticipantes', verifyToken, EventoController.getAllUserPaticipantes)//suas inscrições nos eventos
router.get('/:id', EventoController.getEventoById)//url dinânmica dos eventos
router.delete('/:id', verifyToken, EventoController.removeEventoById)// Deletando eventos
router.patch('/:id', verifyToken, imageUpload.array('images'), EventoController.updateEvento)//atualizando eventos
router.patch('/inscription/:id', verifyToken, EventoController.inscription)//Realizando inscrições nos eventos
router.patch('/conclude/:id', verifyToken, EventoController.concludeEvento)//concluindo o evento
router.get('/pesquisa/:query', EventoController.pesquisarEvento)

module.exports = router