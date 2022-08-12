const Container = require('./Container');
const container = new Container('./pueba.txt');


const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));



app.set('views', './views')
app.set('view engine', 'pug')


app.get('/', (req, res) => {  
  res.render('partials/Form.pug', {
    titulo: "Subir productos Adidas",
    hayLista: true,
    nav:"creador"})
})

app.post('/creador', async (req, res) => {
    const producto = await container.save(req.body);
    const creado =  producto != -1
    console.log(producto)
    res.render('partials/Ok.pug', {     
      hayProducto: creado
    })
 })

app.get('/productos', async (req, res) => {
    const producto = await container.getAll();
    const hayLista = producto.length > 0;
    res.render('index', {
        titulo: "Adidas 2022", 
        listaProductos: producto,
        hayLista,
        nav:"productos"
      })
})












const PORT = 4000 || process.env.PORT;
app.listen(4000, err =>{
    if(err) throw err
    console.log(`Server Running on ${PORT}`)
});