const app = require('./app')

const PORT = process.env.PORT

app.listen(PORT, () =>{
    console.info(`Server running on ${PORT}`)
})