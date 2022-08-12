const express = require('express');

const Container = require('./Container');
const container = new Container('./prueba.txt');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', './views')
app.set('view engine', 'ejs')


app.get('/', (req, res) => {  
    res.render('layout/Form.ejs', {
      title: "Subir producto",
      nav:"formulario"})
  })
  
  app.post('/ok', async (req, res) => {
      const product = await container.save(req.body);
      const create =  product != -1
      
      res.render('layout/Ok.ejs', {     
        newProduct: create,
        title: 'Creacion de producto'
      })
   })
  
  app.get('/productos', async (req, res) => {
      const producto = await container.getAll();
      const listExist = producto.length > 0;
      res.render('layout/productos.ejs', {
          title: "Productos", 
          prodList: producto,
          listExist,
          nav:"product"
        })
  })


const PORT = 4000 || process.env.PORT
app.listen(4000, err =>{
    if(err) throw err
    console.log(`Server running on ${PORT}`)
})