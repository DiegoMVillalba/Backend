const handlebars = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const router = require('./routes/routes');
require('dotenv').config();

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}

const app = express()

app.use(cookieParser(process.env.COOKIES_SECRET))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl:process.env.MONGO,
         mongoOptions: mongoConfig,
        ttl: 60,
    collectionName:'sessions'}),
    secret: process.env.MONGO_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:{ maxAge: 60000}
}))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(router)

app.use(express.static('views'))

app.engine(
    'hbs',
    handlebars.engine({
        extname:'.hbs',
        defaultLayout:'main.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views'
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')



// io.on('connection', async socket => {
//     console.log('Conexión establecida');

//     const dbProducts = await products.getAll();
//     io.sockets.emit('products', dbProducts);
//     const dbMessages = await messages.getAll();
//     io.sockets.emit('messages', dbMessages);

//     socket.on('product', async product => {
//         products.save(product);
//         const dbProducts = await products.getAll();
//         io.sockets.emit('products', dbProducts);
//     })
//     socket.on('message', async message => {
//         messages.save(message);
//         const dbMessages = await messages.getAll();
//         io.sockets.emit('messages', dbMessages);
//     })
// });

module.exports = app;
