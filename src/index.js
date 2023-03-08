import  Admin from "./clases/admin/admin.class.js";
import Customer from "./clases/customers/custom.class.js";

const customerInstance=new Customer(null,null,null,null)
const adminInstance=new Admin("Montserrat Regalado")
 const nombret="televisor 40"
 adminInstance.addProducts(nombret,'Electronica ','televisores' )
 adminInstance.addProducts("televisor 41' ",'Electronica ','televisores',4000 )
 adminInstance.addProducts("televisor 42' ",'Electronica ','televisores',4500 )
 adminInstance.addProducts("televisor 43' ",'Electronica ','televisores',8400 )

//adminInstance.deleteProducts("televisor 40")
//adminInstance.modifyProducts("televisor 4","Electronica","pantallas LED",nombret)


customerInstance.makePayment([
    "televisor 43' ","televisor 42' "
])
//adminInstance.viewProducts()