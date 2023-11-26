const createUserToken = require('../helpers/create-user-token')

const User = require('../models/User')

const bcrypt = require('bcrypt')

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

            // Checagem de existência do usuário
            const userExists = await User.findOne({ email: email })

            if (userExists) {
              res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
              return
            }

            // Criação de senha
            const salt = await bcrypt.genSalt(12) // Encriptando senhas com bcrypt
            const passwordHash = await bcrypt.hash(password, salt)

            // Criação do usuário
            const user = new User({
            name,
            email,
            cpf,
            data,
            password: passwordHash,
            })

            try {
               const newUser = await user.save()  //salvando o registro
                
               await createUserToken(newUser, req, res)

            } catch(error) {
                res.status(500).json({message: error})
            }      
    }

    //Função de login no sistema
    static async login (req,res){
        const {email, password} = req.body

        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório!' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }

        // checagem da existência do usuário
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(422).json({ message: 'Não há usuário cadastrado com este e-mail!' })
            return
        }
        // checagem da senha digitada com a senha registrada
            const checkPassword = await bcrypt.compare(password, user.password)

            if (!checkPassword) {
            return res.status(422).json({ message: 'Senha inválida' })
            }

        
        
    }
}