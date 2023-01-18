# PROYECTO FINAL BACKEND

- Proyecto final del curso de backend Coderhouse. El mismo trabaja con base de datos MongoDB

## Consola

Ejemplo:
- Modo Nodemon: yarn nm [8080] [1] || yarn nm [8080]<br>
- Modo Development: yarn dev [8080] [1] || yarn dev [8080]<br>
- Modo Production: yarn prod [8080] [1] || yarn prod [8080]<br>


# USER:
- POST /user/register 
Ejemplo:
<dl>
    <dt>{</dt>
    <dd>"email": "juancito@gmail.com",</dd>
    <dd>"password": "callefalsa1234"</dd>
    <dd>"username": "juan",</dd>
    <dd>"phone": 789465321</dd>
    <dt>}</dt>
</dl>

- POST /user/login 
Ejemplo:
<dl>
 <dt>{</dt>
    <dd>"email": "juancito@gmail.com",</dd>
    <dd>"password": callsefalsa1234"</dd>
    <dt>}</dt>
</dl>

- GET /user/logout

Caso que el usuario no este logueado no tendrá acceso al sistema y será redireccionado al inicio "/".

# PRODUCTO:
(Valida usuario logueado).
- GET /api/productos -> Trae todos los productos.
- GET by ID /api/productos/:id -> Trae producto por ID desde la base de datos.
- GET by CATEGORY /api/productos/category/:category -> Filtra producto(s) por categoria.
- POST /api/productos -> Guarda los productos en la base de datos a traves (Alternativa desde Postman (req.body) y con  Socket.io (req.productos)).<br>
Ejemplo:
<dl>
<dt>{</dt>
    <dd>"title": "Pan",</dd>
    <dd>"price": 30,</dd>
    <dd>"thumbnail": "https://cdn0.iconfinder.com/data/icons/bakery-and-dessert-color/64/Bread_bun_bakery_doodle_food_icon-128.png",</dd>
    <dd>"description": "Pan de Trigo",</dd>
    <dd>"category": "Harina",</dd>
    <dd>"stock": 1000</dd>
    <dt>}</dt>
</dl>

- DELETE /api/productos/:id -> Elimina producto por ID informado.
- PUT /api/productos/:id -> Actualiza un producto por ID informado.

# CART:
(Valida usuario logueado).
- GET /api/cart -> Trae todos los carritos de compra guardados.
- GET by ID /api/cart/:id -> Trae un carrito especifico por su ID.
- POST /api/cart -> Guarda el carrito del usuario que este logueado. Se implementaria en el fronend lo necesario para lograr tener un carrito.
Ejemplo:
<dl>
 <dt>{</dt>
    <dd>"direction": "Av. Mitre 2058",</dd>
    <dd>"email": "juancito@gmail.com.com",</dd>
    <dd>"items": <dt>[{</dt> 
            <dd>"title": "Naranja",</dd>
            <dd>"price": 50,</dd>
            <dd>"description": "Naranja Jugo",</dd>
            <dd>"category": "Frutas",</dd>
            <dd>"quantity": 12</dd>
            <dt>},{</dt>
            <dd>"title": "Banana",</dd>
            <dd>"price": 120,</dd>
            <dd>"description": "Banana Ecuador",</dd>
            <dd>"category": "Frutas",</dd>
            <dd>"quantity": 6</dd>
        <dt>}]}</dt>
</dl>

- UPDATE /api/cart:id -> Devuelve al frontend un array con toda la información del carrito por su ID. Se implementaria vista y lógica para modificar los valores dentro de un carrito , como eliminar items, cambiar cantidad, etc y poder devolver a la base de datos.
- DELETE /api/cart:id -> Elimina un carrito completo por su ID.

# ORDER:
(Ejecuta el pedido final de una compra. Se implementaria en el frontend lógica y vista para generar un array que contenga los datos del usuario logueado en sesión -como buyer- a través del ID , el status de la orden y un array con todos los items guardados en su carrito previamente creado, también cargado a traves del ID correspondiente).
- POST /api/order -> Envia y guarda la orden de compra.
Ejemplo:
<dl>
<dt>{</dt>
    <dd>"userId": "61553d6981d5de474926cafa",</dd>
    <dd>"status": "Generada",</dd>
    <dd>"cartId": "615534e769cade37b7e01721"</dd>
    <dt>}</dt>
</dl>

- GET /api/order -> Devuelve todas las ordenes almacenadas.
- GET /api/order/:id -> Devuelve una orden especifica por su ID.
- DELETE /api/order/:id -> Elimina una orden especifica por su ID.


# LIBRERIAS / DEPENDENCIAS USADAS

- bcryptjs 
- connect-flash 
- cookie-parser 
- dotenv 
- ejs 
- express
- express-handlebars 
- express-session 
- jsonwebtoken 
- mongoose 
- morgan 
- nodemailer 
- nodemon 
- passport 
- passport-jwt 
- passport-local 
- pug 
- socket.io 
- socketio 
- winston 
- yarn
