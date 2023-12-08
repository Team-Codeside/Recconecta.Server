const express = require('express')
const cors = require('cors')
const bodyParse = require('body-parser')

//config resposta JSON
const app = express ()

// resolver CORS
app.use(cors({ credentials: true, origin: '*'}))
app.use(bodyParse.json())

//Pasta pública para imagens

app.use (express.static('public'))

//Rotas 
const UserRoutes = require ('./routes/UserRoutes')
const EventoRoutes = require('./routes/EventoRoutes')



app.use('/users', UserRoutes)
app.use('/eventos',EventoRoutes )


app.listen(5000)