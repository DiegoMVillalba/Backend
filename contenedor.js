const fs = require('fs');

class Contenedor {
    constructor(ruta){
    this.ruta = ruta
    }

    async save(obj){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8');
            let dataArchParse = JSON.parse(dataArch) 
            if (dataArchParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, {...obj, id:dataArchParse.length + 1}],null, 2))
                
            }else{
                await fs.promises.writeFile(this.ruta, JSON.stringify([{...obj, id:dataArchParse.length + 1}],null, 2))

            }
            console.log(`el Archivo tiene el id: ${dataArchParse.length + 1}`)
            
        } catch (error) {
            console.log(error);
        }

}



       
    

    async getById(id){
        let dataArch =await fs.promises.readFile(this.ruta, 'utf8')
        let dataArchParse = JSON.parse(dataArch)
        let producto=dataArchParse.find(producto=> producto.id === id)
        try {
            if(producto){ 
                console.log(producto)
            } else {               
                    console.log('No se encontro el producto')  
                }               
        } catch (error) {
            console.log(error)
            
        }

            
    }
     async getAll(){
        try {
            let dataArch =await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if(dataArchParse.length){

                console.log(dataArchParse)
            }else{
                console.log('no hay productos')
            }
        } catch (error) {
            console.log(error)
   
        }
     }

     async deleteId(id){
        try {
            let dataArch =await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let producto=dataArchParse.find(producto=> producto.id === id)
                if(producto){
                    let dataArchParseFiltrado = dataArchParse.filter(producto => producto.id !== id)
                    await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf8')
                    console.log('producto eliminado')
                    }   else{
                            console.log('no existe el producto')
                    }
            
        } catch (error) {
            
            
        }
     }


    async deleteAll(){
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf8')
        console.log('Productos eliminados')
    }

    
}

module.exports = Contenedor