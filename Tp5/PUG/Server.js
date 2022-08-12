const Container = require('./Container');
const container = new Container('./prueba.txt');


const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));



app.set('views', './views')
app.set('view engine', 'pug')


app.get('/', (req, res) => {  
	res.render('Formulario.pug', {
	  title: "Subir productos ",
	  listExist: true,
	  nav:"creador"})
  })
  
  app.post('/Form', async (req, res) => {
	  const product = await container.save(req.body);
	  const create =  product != -1
	  
	  res.render('Ok.pug', {     
		newProduct: create
	  })
   })
  
  app.get('/productos', async (req, res) => {
	  const product = await container.getAll();
	  const listExist = product.length > 0;
	  res.render('index', {
		  title: "Productos", 
		  prodList: product,
		  listExist,
		  nav:"product"
		})
  })












const PORT = 4000 || process.env.PORT;
app.listen(4000, err =>{
    if(err) throw err
    console.log(`Server Running on ${PORT}`)
});