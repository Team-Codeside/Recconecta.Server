const jwt = require("jsonwebtoken")

const createUserToken = async(user, req ,res) => {

    //Criação do token
    const token = jwt.sign({ 
        name: user.name,
        id: user._id,
    }, 
    'mysecret',//Fortificação do toker obs:alterar para uma string mais complexa
    ) 

    //Resposta do token
    res.status(200).json({
        message : "Você está autenticado",
        token: token,   
        userId: user._id,
})
     
}

module.exports = createUserToken