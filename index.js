const express = require('express')
const cors = require('cors')
const bodyParse = require('body-parser')

//config resposta JSON
const app = express ()

// solve CORS
app.use(cors({ credentials: true, origin: 'http://locallhost:3000'}))
app.use(bodyParse.json())

//Public folder for images 

app.use (express.static('public'))

//routes 
const UserRoutes = require ('./routes/UserRoutes')
const EventoRoutes = require('./routes/EventoRoutes')



app.use('/users', UserRoutes)
app.use('/eventos',EventoRoutes )


app.listen(5000)