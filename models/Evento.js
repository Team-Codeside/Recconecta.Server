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
    },
    categoria: {
        type: String,
        required: true,
      },
    data: {
      type: Date,
      required: true,
    },
    hora: {
        type: Date,
        required: true,
      },

    localizacao: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
    },
    users: Object,
    participante: Object,
  }, {timestamps: true}),
)

module.exports = Evento