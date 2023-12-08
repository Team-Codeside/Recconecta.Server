const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    datanasc:{
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  }, {timestamps: true}),
)

module.exports = User