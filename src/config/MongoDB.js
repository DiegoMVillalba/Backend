import mongoose from 'mongoose';
import logger from '../loggers/Log4jsLogger.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) =>{
    err 
    ?
    logger.error('Error al conectarse a MongoDB')
    : 
    logger.info('Connected to MongoDB')
});


export default mongoose;
