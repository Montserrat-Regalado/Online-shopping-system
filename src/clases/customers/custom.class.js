import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
class Customer{
    
    constructor(id,name,adress,phNo){
        this.id=id;
        this.name=name;
        this.adress=adress;
        this.phNo=phNo
    }
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

    //listaCompras=['tele1',tele2]
    buyProducts(listaCompras){
        const newArray=this.newArray.filter((productBought)=>productBought.name!==listaCompras.name)
        this.writeDb(newArray)
    }
    makePayment(list){
        //Entrada:Leer arreglo de productos seleccionados

        //Proceso:Array seleccionado vs Array All con name, extraer y eliminar, agrego un acumulador y sumo precio.

        let listPurchase=this.readDB()
        let cuentaTotal=0

        const listProductUpdate=list.map(x=>{
            listPurchase.forEach((element,index) => {
                if (element.name==x) {
                    cuentaTotal+=element.precio
                    listPurchase.splice(index,1)
                    return;
                }
            });
            return listPurchase;
        })
        console.table(listProductUpdate)

        this.writeDb(listProductUpdate)

        return cuentaTotal;
    }
}

export default Customer;