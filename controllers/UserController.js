const User = require('../models/User')

module.exports = class UserController {
    static async register(req, res){
        res.json('olá Recconecta')
    }
}