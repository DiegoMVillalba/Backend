import mongoose from 'mongoose';
import logger from '../loggers/log4jsLogger.js';
require('dotenv').config();

mongoose.connect(process.env.MONGODB, (err) =>{
    err 
    ?
    logger.error('Error al conectarse a MongoDB')
    : 
    logger.info('Connected to MongoDB')
});


export default mongoose;
