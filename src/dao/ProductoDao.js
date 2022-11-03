import '../config/MongoDB.js';
import { ProductosModel } from '../modules/productos.modules.js';
import logger from '../loggers/log4jsLogger.js';

export class ProductoDao {
    
    ID_FIELD = '_id';

    static async exist(id) {
        try {
        return await ProductosModel.findById(id);           
        } catch (error) {
            logger.error(error);

        }
    }
    async getAll() {
        try {
            return await ProductosModel.find();
        } catch (error) {
            logger.error(error);
            return false;
        }
    }

    async getProductById(objectId) {
        try {
            const product = await ProductosModel.findOne({[this.ID_FIELD] : objectId});
            return product;
        } catch (error) {
            logger.error(error);
            return false;
        }
    }

    async createProduct(objet) {
        try {
            return await ProductosModel.create(objet);
        } catch (error) {
            logger.error(error);
            return false;
        }
    }

    async updateProductById(id, object) {
        try {
            await ProductosModel.findByIdAndUpdate({[this.ID_FIELD] : id}, object,{runValidator: true});
            return true;
        } catch (error) {
            logger.error(error);
            return false;
        }
    }

    async deleteProductById(id) {
        try {
            return await ProductosModel.findByIdAndDelete({[this.ID_FIELD] :id})
        } catch (error) {
            logger.error(error);
            return false;
        }
    }
}