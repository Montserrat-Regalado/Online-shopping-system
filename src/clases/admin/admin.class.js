import Products from "../products/products.class.js"
import { v4 as uuidv4 } from "uuid"
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

class Admin {
    constructor(name) {
        this.id = uuidv4()
        this.name = name
        console.log({ id: this.id, name: this.name })
        this.readDB();
    }

    viewProducts() {
        const variablequeaccedeBD=this.readDB()
        variablequeaccedeBD.forEach((product, index) => {
            console.log(`${index}:${JSON.stringify(product)}`)
        })
    }

    /**
     * 
     * @returns array <object>
     */
    readDB() {
        //se crea constanate para declarar el directorio del archivo que simula la db
        //Lineas de codigo 25- 27 para saber en donde esta mi archivo "productos.db.json"
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const pathDb = path.join(__dirname, '../../../db/productos.db.json')
        //se valida si dicho  archivo existe
        if (fs.existsSync(pathDb)) {
            //se obtiene la informacion que esta escrita en dicho directorio de forma de string  
            //se usa json.parse para convertilo a un objeto json
            const listDb = JSON.parse(fs.readFileSync(pathDb, { encoding: 'utf-8' })) //listDb ="hola amor"
            return listDb.length > 0 ? listDb : []
        }
    }

    writeDb(newArray) {
        //se crea constanate para declarar el directorio del archivo que simula la db
        //Lineas de codigo 25- 27 para saber en donde esta mi archivo "productos.db.json"
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const pathDb = path.join(__dirname, '../../../db/productos.db.json')
        if (fs.existsSync(pathDb)) {
            fs.writeFileSync(pathDb,JSON.stringify(newArray))
        }
   }

    addProducts(name, group, subgroup,precio) {
        //genera id nuevo
        const idProduct = uuidv4();
        //instancia el nuevo objeto "producto"
        const newProduct = new Products(idProduct, name, group, subgroup,precio);
        //aobtiene el arreglo de readDb ya sea con informacion o vacio
        const productList = this.readDB();
        //agregamos el nuevo elemento al arreglo que obtenemos de la "BD"
        productList.push(newProduct)
        //Se envia product list al nuevo elemento
        this.writeDb(productList)





    }

    deleteProducts(name) {
        const variableDB=this.readDB()
        this.variableDB = this.variableDB.filter((productDelete) => productDelete.name !== name)

        this.writeDb(variableDB)

    }

    modifyProducts(name, group, subgroup, termino) {
        //1
        const variableDB=this.readDB()
        let objMod = this.variableDB.filter((product) => product.name == termino)

        //3
        const newProduct = new Products(objMod[0].id, name, group, subgroup)
        //4
        this.variableDB = this. variableDB.filter((product) => objMod[0].id !== product.id)
        //5
        this.variableDB.push(newProduct);

        this.writeDb(variableDB)


    }
}


export default Admin;