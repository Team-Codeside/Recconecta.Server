const User = require('../models/User')

module.exports = class UserController {
    static async register(req, res){
            const name = req.body.name
            const email = req.body.email
            const cpf = req.body.cpf
            const data = req.body.data
            const password = req.body.password
            const confirmpassword = req.body.confirmpassword
        
            // Validação dos campos
            if (!name) {
                res.status(422).json({ message: 'O nome é obrigatório!' })
                return
            }
        
            if (!email) {
                res.status(422).json({ message: 'O e-mail é obrigatório!' })
                return
            }
        
            if (!cpf) {
                res.status(422).json({ message: 'O CPF é obrigatório!' })
                return
            }
            if (!data) {
                res.status(422).json({ message: 'O Data é obrigatório!' })
                return
            }
        
            if (!password) {
                res.status(422).json({ message: 'A senha é obrigatória!' })
                return
            }
        
            if (!confirmpassword) {
                res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
                return
            }
        
            if (password != confirmpassword) {
                res
                .status(422)
                .json({ message: 'A senha e a confirmação precisam ser iguais!' })
                return
            }

            
  
    }
}