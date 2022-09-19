const  ContenedorArchivo = require('../../container/ContenedorArchivo.js');


class CarritoDaoArchivo extends ContenedorArchivo{
    constructor() {
        super('../../data/carritos.json');
    }
    // actualizar producto por ID
    async updateById(id, carrito){
        carrito.id = id;
        try {
                const carritos = await this.getAll();
                const index = carritos.findIndex(obj => obj.id === id);
                if(index !== -1){
                    carritos[index] = carrito;
                    await fs.promises.writeFile(
                        this.ruta,
                        JSON.stringify(carritos, null, 2)
                    );
                    return {mensaje: 'Carrito Actualizado'};
                }else{
                    return {mensaje: 'Carrito no encontrado'};
                }
        } catch (error) {
            console.log(error);
        }
    }

    //traer producto por ID
    async getById(id){
        try {
            const dataArchivo = await this.readFileFunction(this.ruta);
            const producto = dataArchivo.fid(producto => producto.id === id);
            if(producto){
                return producto;
            } else{
                return {error: 'Producto no encontrado'};
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Traer todo
    async getAll() {
         try {
            const dataArchivo = await this.readFileFunction(this.ruta);
            if (dataArchivo.length){
                return dataArchivo;
            } else {
                console.log('No hay productos');
                return dataArchivo;
            }
            
         } catch (error) {
            console.log(error);
            
         }
    }

    //añadir al carrito
    async addProductToCart(idCart, product) {
        try {
            const carritoById = await this.getById(parseInt(idCart));
            let timestamp = Date.now();
            if (carritoById.productos.length) {
                let productToAdd = {
                    id: carritoById.products[carritoById.productos.length -1].id + 1,
                    timestamp,
                    ...product
                };
                carritoById.producto.push(productToAdd);
                await this.updateById(parseIn(idCart), carritoById);
                let idProduct = carritoById.productos[carritoById.productos.length - 1].id;
                console.log(`El producto agregado tiene el  ID: ${idProduct}`);
                return idProduct;
            } else {
                let productToAdd ={ id : 1, timestamp, ...product};
                carritoById.productos.push(productToAdd);
                await this.updateById(parseInt(idCart), carritoById);
                console.log(`El producto agregado tiene el ID : 1`);
                return 1;
            }
        } catch (error) {
            console.log(error);
        }
    }

    //elminar producto por id
    async deleteById(id) {
        try {
            let dataArchivo = await this.readFileFunction(this.ruta);
            let carrito = dataArchivo.find( carrito => carrito.id === id);
            if (carrito){
                const dataArchParseFiltrado = dataArchivo.filter(
                    carrito => carrito.id !== id
                );
                await fs.promises.writeFile(
                    this.ruta,
                    JSON.stringify(dataArchParseFiltrado, null, 2),
                    'utf-8'
                );
                console.log('Carrito eliminado');
            } else {
                console.log('No se encontro el carrito');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(idCart, idProduct) {
        try {
            let dataArchivo = await thisReadFileFunction(this.ruta);
            let carrito = dataArchivo.find(carrito => carrito.id === idCart);
            let producto  = carrito.productos.find(
                producto => producto.id === idProduct
            );
           if (carrito){
            let productosFiltrados = carrito.productos.filter(
                producto => producto.id !== idProduct
            );
            carrito.productos = productosFiltrados;
            await this.updateById(idCart, carrito);
            console.log('Producto eliminado');
           } else {
            console.log('No se encontro el carrito');
           }
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = CarritoDaoArchivo;