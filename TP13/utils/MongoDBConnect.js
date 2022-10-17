const mongoose = require('mongoose');
require('dotenv').config()

const mongoConnect = async () =>{
    try {
        const url = process.env.MONGODB;
        await mongoose.connect(url,{
            useNewParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Conexion a mongoDB ok'))
       
    } catch (error) {
        return error
    }
}

module.exports = mongoConnect;