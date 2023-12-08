const multer = require("multer")
const path = require ("path")

//Destino para armazenar imagem 
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
    let folder = ""                             //Qual pasta vai ser salvo

    if(req.baseUrl.includes("users")){          //url de imagens de uruários
        folder = "users"
    }else if (req.baseUrl.includes("eventos")){ //url de imagens de eventos
        folder = "eventos"
    }

    cb(null, `public/images/${folder}`)  //pasta retorno 
},

//Nome do arquivo depois de salvo
filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Incluindo a data atual para evitar repetição
}

})

const imageUpload = multer ({
    storage: imageStorage, 
    fileFilter(req, file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)) {//Definindo o formato das imagens
        return cb(new Error("Enviar imagens apenas jpg ou png!"))
        }
        cb(undefined, true)
    }  
})

module.exports = {imageUpload}
