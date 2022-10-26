import express from 'express';
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';
import userRouter from './routes/user.js';
import otherRouter from './routes/other.js';
import session from 'express-session';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoStore from 'connect-mongo';
import compression from 'compression';
import minimist from ' minimist';
import logger from './loggers/log4jsLogger.js';
import loggerMiddleware from './middlewares/routesLogger.middleware.js';
require('dotenv').config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(loggerMiddleware);
app.use(express.static('public'));
app.use(compression());
app.set('views', '/src/views');
app.set('view engine', 'hbs');

app.engine(
    'hbs',
    engine({
            extname:'.hbs',
            degaultLayout: 'index.hbs',
            layoutsDir: __dirname + '/views/layouts',
            partialsDir: __dirname + '/views/partials'
    })
);

app.use(session({
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        options:{
            useNewParser: true,
            useUnifiedTopology: true
        }
    }), 
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge: 600000}
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);
app.use('/api/usuario', userRouter);
app.use('/test', otherRouter);


app.all('*', (req, res) => {
    res.status(404).json({'error': 'ruta no existente'});
});

/* --------------------------------Leer el puerto por consola o setear default------------------------------------*/

const options = {
    alias:{
        'p':'PORT'
    },
    default: {
        'PORT': 8080
    }
};

app._router.stack.foreach(function(r){
    if(r.route && r.route.path){
        console.log(r.route.path);
    };
});

const { PORT } = minimist(process.argv.slice(2), options);

const server = app.listen(PORT, () =>{
    logger.info(`server started at http://localhost:${PORT}`)
});
server.on('error',(err) => logger.error(err));


