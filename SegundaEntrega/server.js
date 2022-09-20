const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();

const Carrito = require('./src/daos/index')
const Producto = require('./src/daos/index')


const Carritos = new Carrito();
const Productos = new Producto();
console.log(Carritos)

app.use(express.json());
app.use(express.urlencoded ( {extended:true } ) );


const ADMINISTRADOR = true;

                        //-----PRODUCTO-----\\

//---Trae por ID o todos los productos---\\
app.get('/api/productos/:id', (req, res) => {
    const { id } = req.params;

    if(id){
        Productos.getById(id).
        then(data => {
            res.json(data);
        });
    } else {
        Productos.getAll().
        then(data => {
            res.json(data);
        });
    }
});

//---Crea el producto---\\
app.post('/api/productos',(req, res) => {
    if(ADMINISTRADOR){
        let timestamp = Date.now();

        Productos.save({ timestamp, ...req.body}).
        then(data=>{
            res.json({id:data});
        });
    } else {
        res.json({
            error:-1,
            descripcion: `ruta ${req.path} método ${req.method} no permitida`
        })
    }
});

//-----Modifica el producto-----\\
app.put('/api/pruductos/:id', (req, res) =>{
    if(ADMINISTRADOR){
        const { id } = req.params;
        let timestamp = Date.now();
        
        Productos.updateById({id: id, timestamp, ...req.body}).
        then(data =>{
            res.json({id: data});
        });
    } else {
        res.json({
            error:-1,
            descripcion: `ruta ${req.path} método ${req.method} no permitida`
        });
    };
})


                    //-----CARRITO-----\\

//----Crea el carrito----\\
app.post('/api/carrito', (req, res) =>{
    let timestamp = Date.now();

    Carritos.save({ timestamp, productos: [], }).
    then(data =>{
        res.json({
            id:data
        });
    });
});

//----Borra el carrito----\\
app.delete('/api/carrito/:id', (req, res) =>{
    const { id } = req.params;
    
    Carritos.deleteById(id).
    then(data => {
        res.json({
            delete: id
        });
    });
});

//----Lista del carrito----\\
app.get('/api/carrito/:id/productos', (req, res) =>{
    const { id } = req.params;
    Carritos.getById(id).
    then(data =>{
        res.json(data);
    });
});

//----Guarda producto en el carrito----\\
app.post('/api/carrito/:id/productos', (req, res) =>{
    const { id } = req.params;
    const { id_prod} = req.body;

    Productos.getById(id_prod).
    then(productoData =>{
        Carritos.save(id, productoData).
        then(data =>{
            res.json(data);
        });
    });
});

//----Borra un producto del carrito----\\
app.delete('/api/carrito/:id/productos/:id_prod', (req, res) =>{
    const { id, id_prod  } = req.params;
    
    Carritos.deleteById(id, id_prod).
    then(data => {
        res.json(data);
    });
});

//----Ruta no existente----\\

app.use('/api/*', (req, res) =>{
    res.json({
        error: -2,
        descripcion: `ruta ${req.path} método ${req.method} no implementada`
    });
});


//----Actualizacion de paginas----\\
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

//-----PORT-----\\
const PORT= process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log(`Server running on port${PORT}`);
});
