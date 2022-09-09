- Listar todos los documentos en cada colección:

  - Mensajes: `db.msj.find()`
  - Productos: `db.productos.find()`

- Mostrar la cantidad de docimentos almacenados en cada una de ellas:

  - Mensajes: `db.msj.estimatedDocumentCount()`
  - Productos: `db.productos.estimatedDocumentCount()`

- Realizar un CRUD sobre la colección de productos:
  - Agregar un producto más en productos: `db.productos.insertOne({nombre: "Nike metcon 8", precio: 30000, thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-22yvKQyePHebaeVMKpTiHa92ub-Kke70kQ&usqp=CAU"})`
  - Consultar por nombre de productos que:
    - Tengan precio menor a 1000: `db.productos.find({precio: {$lt: 1000}})`
    - Tengan precio entre 1000 y 3000: `db.productos.find({precio: {$gt: 1000, $lt: 3000}})`
    - Tengan precio mayor a 3000: `db.productos.find({precio: {$gt: 3000}})`
    - Sea el tercero más barato: `db.productos.find().sort({precio: 1}).limit(1).skip(2)`
  - Hacer una actualización sobre todos los productos, agregando stock: 100: `db.productos.updateMany({}, {$set: {stock: 100}})`
  - Cambiar a 0 el stock de todos los productos mayores a 4000: `db.productos.updateMany({precio: {$gt: 4000}}, {$set: {stock: 0}})`
  - Eliminar todos los productos que tengan precio menor a 1000: `db.productos.deleteMany({precio: {$lt: 1000}})`