const Contenedor = require('./Container');
const Container = new Contenedor('./prueba.txt');

const express = require('express');
const app = express();
const handleBars = require('express-handlebars');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));



app.engine(
    'hbs',
    handleBars.engine({
        extname:'.hbs',
        defaultLayout:'main.hbs',
        layoutsDir: __dirname + '/views',
        partialsDir: __dirname + '/views/partials'
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')







app.get('/',async (req, res) =>{
    res.render('layout/Form.hbs',{
        titulo:"Productos",
        product:false
    })
       

})

app.get('/productos', async (req, res) =>{
    const product = await Container.getAll()
    const listExist = product.length > 0;
    res.render('layout/index.hbs',{
        title: "Productos", 
        list: product,
        listExist,
        product: true 
    })
})

app.post('/ok', async (req,res) =>{
    const product = await Container.save(req.body)
    const create = product != -1
    res.render('layout/Ok.hbs',{
        newProduct: create,
        title: 'Creacion de producto'
    })
})












// *********Rutas*********//


const PORT = 4000
app.listen(4000, err => {
    if(err) throw err
    console.log(`Server running on ${PORT} `)
})


