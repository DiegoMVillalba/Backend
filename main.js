const Contenedor =require('./Contenedor');
const Class = new Contenedor('./prueba.txt');

const express = require('express')


const app = express()
const port = 8080

app.get('/productos', async(request,response) =>{
    let product = await Class.getAll();
    response.send(product)
} )

app.get('/random', async (request, response) =>{
    let quantity = await Class.getLength();
    let random = Math.floor(Math.random() * quantity) + 1;
    let randomProduct = await Class.getById(random)
    response.send(randomProduct);
})





app.listen(port, () =>{
    console.log(`Servidor corriendo en el puerto : ${port}`)
})