const  ContenedorFirebase  = require ('../../container/ContenedorFirebase.js');

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('productos');
    }

}
module.exports = ProductosDaoFirebase;