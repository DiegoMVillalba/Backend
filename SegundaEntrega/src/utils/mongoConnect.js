const mongoose = require('mongoose')


const mongoConnect = async () =>{
    try {
        const url = "mongodb://localhost:27017/ecommerce";
        await mongoose.connect(url, {
            useNewParser: true,
            useUnifiedTopology: True
        });
        console.log('Mongo db connectado')
    } catch (error) {
        return error
    }
};

module.exports = mongoConnect;