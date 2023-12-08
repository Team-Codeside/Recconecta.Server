const mongoose = require('../db/conn')
const { Schema } = mongoose

const Evento = mongoose.model( 
  'Evento',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoria: {
        type: String,
        required: true,
      },
      dataev: {
      type: String,
      required: true,
    },
    hora: {
        type: String,
        required: true,
      },

    endereco: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    available: {
      type: Boolean,
    },
    user: Object,
    participante: Object,
  }, {timestamps: true}),
)

module.exports = Evento 