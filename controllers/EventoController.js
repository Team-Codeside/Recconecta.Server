const Evento = require("../models/Evento")


//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require ("../helpers/get-user-by-token")
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class EventoController{

    //criação do evento
    static async create (req,res) {
        const { name, description, categoria,  data, hora, endereco} = req.body

        const images = req.files

        const available = true



        //upload de imagem

        //validações
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
          }
      
          if (!description) {
            res.status(422).json({ message: 'A descrição é obrigatória!' })
            return
          }
      
          if (!categoria) {
            res.status(422).json({ message: 'O categoria é obrigatória!' })
            return
          }
      
          if (!data) {
            res.status(422).json({ message: 'A data é obrigatória!' })
            return
          }
      
          if (!hora) {
            res.status(422).json({ message: 'A hora é obrigatória!' })
            return
          }
          if (!endereco) {
            res.status(422).json({ message: 'O  endereço é obrigatório!' })
            return
          }
          if (images.length === 0) {
            res.status(422).json({ message: 'A imagem é obrigatória!' })
            return
          }


          //resgatando o criador do evento 
          const token = getToken(req)
          const user = await getUserByToken(token)


          //criando o evento
          const evento = new Evento({
            name,
            description,
            categoria,
            data,
            hora,
            endereco,
            available,
            images:[],
            user:{
                _id: user._id,
                name: user.name,
                image: user.image,
                email: user.email,
            },
          })
            //percorrendo o array de images para altrar os metadados(nome)
            images.map((image) => {
            evento.images.push(image.filename)
          })

          try {
            //salvando o evento
            const newEvento = await evento.save()
            res.status(201).json({message: 'Evento cadastrado com sucesso!',newEvento})
            
          } catch (error) {
            res.status(500).json({message: error})
          }
      
    }

    //Filtros

    static async getAll(req,res) {
        const eventos = await Evento.find().sort('-createdAt')//filtrando os eventos (mais recentes)
        res.status(200).json({eventos: eventos,})

    }

    static async getAllUserEventos(req,res){
        //regatando o token do usúario
        const token = getToken(req)
        const user = await getUserByToken(token)

        const eventos = await Evento.find({'user._id': user._id}).sort('-createdAt');

        res.status(200).json({eventos,})
    }


    static async getAllUserPaticipantes(req, res) {
        //regatando o token do usúario
        const token = getToken(req)
        const user = await getUserByToken(token)

        const eventos = await Evento.find({'participante._id': user._id}).sort('-createdAt');

        res.status(200).json({ eventos,})
    }

    //id dos eventos

    //Verficação do id/url do evento
    static async getEventoById(req,res){
        const id = req.params.id
        
        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID inválido!' })
            return
        }

        //checando se o evento existe
        const evento = await Evento.findOne({_id: id})

        if(!evento) {
            res.status(404).json({message: 'Evento não encontrado!'})
        }

        res.status(200).json({
            evento: evento, 
        })   
    }
}