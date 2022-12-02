const Contenedor = require('./Contenedor');
const Container = new Contenedor('./prueba.txt');

const express = require('express')
const app = express()
const {Router} = express
const products = Router()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

// all productos
products.get('/', async (req, res) =>{  
    const allProducts = await Container.getAll();
    res.json(allProducts)
});

//buscar por id
products.get('/:id', async (req, res) =>{
    const {id} = req.params
    const productId = Container.getById(+id);
    res.json(productId);
});

//agregar productos
products.post('/', (req, res) =>{
    const productObj = req.body
    Container.save(productObj);
   
        res.json({
            ok: true,
            mensaje: 'El Post se agrego correctamente',
            id: productObj
        })     
   
});

//Actualizar por id 
products.put('/:id', async (req, res) =>{
   const {id} = req.params
   const productObj = req.body
   console.log(productObj)
    const response = Container.updateById({id: parseInt(id), ...productObj})
    res.json({msg:"Producto actualizado",
    response
})
})

//Borrar por id
products.delete('/:id', async(req, res) =>{
    const {id} =req.params
    Container.deleteId(parseInt(id))
    res.json({
        msg:"Producto eliminado"
    })
})



// *********Rutas*********//

app.use('/api/productos', products )

const PORT = 8080
app.listen(8080, err => {
    if(err) throw err
    console.log(`Server running on ${PORT} `)
})


