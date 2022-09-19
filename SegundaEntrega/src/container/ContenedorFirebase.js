const admin = require('firebase-admin');
const serviceAccount = require('../utils/backend-33762-firebase-adminsdk-u2xn1-61fad9bba6.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

class ContenedorFirebase{
    constructor(coll){
        this.coll = coll;
        this.conexion();
        this.query = db.collection(coll);
    }

    async connexion() {
        console.log(`Firesto conectado`);
    }

    // Guardar producto
    async save(obj){
        try{
            let guardar = await this.query.add(obj);
            return guardar.id;
        }catch(error){
            console.log(`Error al guardar ${error}`);
        } finally {

        }
    }
    //Traer por id
    async getById(id){
        try {
            let datos  = await this.query.doc(id).get();
            let newDatos = { ...datos.data(),id: datos.id};
            return newDatos;
        } catch (error) {
            console.log(`No se pudo traer producto ${id}. ${error}`);
        }
    }

    //Traer todos los productos
    async getAll(){
        try {
            let querySnapshot = await this.query.get();
            let docs = querySnapshot.docs;
            let newDatos = docs.map( doc => ({
                ...doc.data(),
                id: doc.id
            }));
            return newDatos
        } catch (error) {
            console.log(`Error al mostrar ${error}`)
        }
    }

    //Eliminar producto por id
    async deleteById(id){
        try {
            let datos = await this.query.doc(id).delete();
            return datos;
        } catch (error) {
            console.log(`error al eliminar: ${error}`);
        } finally{

        }
    }

    // Modificar Producto
    async updateById(obj){
        try {
             await this.query.doc(obj.id).update(obj);
             return obj.id;
        } catch (error) {
            console.log(`error al actualizar :${error}`);
        }
    }
}

module.exports = ContenedorFirebase;