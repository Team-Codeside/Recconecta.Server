const jwt = require ('jsonwebtoken')
const getToken = require('../helpers/get-token')

// Middleware para validação do token

const checkToken = (req, res, next) => {

    //Sem campo de autorização
    if (!req.headers.authorization){ 
        return res.status(401).json({message: 'Acesso Negado!'})
    }

    //token invalido 
    const token = getToken(req) 

    if(!token) {
        return res.status(401).json({message: 'Acesso Negado!'})
    }

    //Verificação do Token
    
    try {
        const verified = jwt.verify(token, 'mysecret')
        req.user = verified
        next()

    } catch (err) {
        return res.status(400).json({message: 'Token inválido!'})
    }
}

module.exports = checkToken