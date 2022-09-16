const mongoose = require ('mongoose')

const connectionDB = async () =>{
    try {
        const url =process.env.CONNECTION_MONGODB
        await mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(() => console.log('Conexion a mongoDB ok'))
        
    } catch (error) {
        console.log(error
            )
        
    }

} 

module.exports = connectionDB