const fs = require('fs');

class Contenedor {
    constructor(route){
    this.route = route
    }

    async #readFileFunction(route){
        let file = await fs.promises.readFile(route, 'utf-8')
        let parsedFile = await JSON.parse(file)
        return parsedFile
    }



    async save(obj){
        try {
            let dataArch = await this.#readFileFunction(this.route);
            
            if (dataArch.length){
                await fs.promises.writeFile(this.route, JSON.stringify([...dataArch, {...obj, id:dataArch.length + 1}],null, 2))
                
            }else{
        
                await fs.promises.writeFile(this.route, JSON.stringify([{...obj, id:dataArch.length + 1}],null, 2))

            }
            console.log(`el Archivo tiene el id: ${dataArch.length + 1}`)
            
        } catch (error) {
            console.log(error);
        }

}
    async getLength(){
        let dataArch = await this.#readFileFunction(this.route,)
        
        return dataArch.length;
    }     
    

    async getById(id){
        let dataArch = await this.#readFileFunction(this.route, 'utf8')
        
        let producto = dataArch.find(producto=> producto.id === id)
        try {
            if(producto){ 
                console.log(producto)
                return producto
            } else {               
                    console.log('No se encontro el producto')  
                }               
        } catch (error) {
            console.log(error)
            
        }

            
    }

    async updateById(obj){
        try {
            let dataArch = await this.#readFileFunction(this.route);
            
            const indexObj = dataArch.findIndex(prod => prod.id === obj.id)
            if (indexObj !== -1){

                dataArch[indexObj] = obj

                await fs.promises.writeFile(this.route, JSON.stringify(dataArch, null, 2))

                return {msg:`Actualizado el producto ${obj.id}`}
                
            }else{
                return {error: 'No existe el producto'}

            }
            
        } catch (error) {
            console.log(error);
        }
    }



     async getAll(){
        try {
            let dataArch =await this.#readFileFunction(this.route, 'utf8')
            
            if(dataArch.length){

                console.log(dataArch)
                return dataArch
            }else{
                console.log('no hay productos')
            }
        } catch (error) {
            console.log(error)
   
        }
     }

     async deleteId(id){
        try {
            let dataArch =await this.#readFileFunction(this.route, 'utf8')
            let producto=dataArch.find(producto=> producto.id === id)
                if(producto){
                    let dataArchFiltrado = dataArch.filter(producto => producto.id !== id)
                    await fs.promises.writeFile(this.route, JSON.stringify(dataArchFiltrado, null, 2), 'utf8')
                    console.log('producto eliminado')
                    }   else{
                            console.log('no existe el producto')
                    }
            
        } catch (error) {
            
            
        }
     }


    async deleteAll(){
        await fs.promises.writeFile(this.route, JSON.stringify([], null, 2), 'utf8')
        console.log('Productos eliminados')
    }

    
}

module.exports = Contenedor