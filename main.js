const Contenedor =require('./contenedor');


const contenedor = new Contenedor('./prueba.txt')

contenedor.save({nombre:'Remera', precio: 550, categoria: 'Remera', descripcion:'Remera Negra'})

// contenedor.getById(2)

// contenedor.getAll()

// contenedor.deleteId(2)

// contenedor.deleteAll()