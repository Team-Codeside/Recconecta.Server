const express = require('express')
const cors = require('cors')


//config resposta JSON
const app = express ()

// solve CORS
app.use(cors({ credentials: true, origin: 'http://locallhost:3000'}))


//Public folder for images 

app.use (express.static('public'))

//routes 
const UserRoutes = require ('./routes/UserRoutes')

app.use('/users', UserRoutes)

app.listen(5000)