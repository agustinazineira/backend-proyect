import ProductManager from './ProductManager.js';
import express from "express";


const manager = new ProductManager();

const server = express();

const operacionesProductos = async () =>{
    server.get("/products", async (req, res) => {
        try {
            const consulta = await manager.getProducts();
            let limit = Number.parseInt(req.query.limit)
    
            if (limit) {
             
                const resultado = consulta.slice(0, limit);
                res.send(resultado);
            } else {
          
                res.send(consulta);
            }
        } catch (error) {
            console.log(error)
        }
    });
    
    server.get("/products/:pid", async (req, res) => {
        try {
            let id = req.params.pid
            console.log(id)
            const consultaId = await manager.getProductById(Number.parseInt(id));
            if (!consultaId) {
                console.log("ej");
                return res.send({ error: "El producto con ese id no se encuentra en el archivo" });
            } else {
                res.send(consultaId);
            }
        } catch (error) {
            console.log(error);
        }
    });
    
    server.listen(8080, () => {
        try {
            console.log("Servidor arriba en el puerto 8080");
        } catch (error) {
            console.log(error);
        }
    });
    
}

operacionesProductos()







/*const manager = new ProductManager(`./files/Productos.json`);

const operacionesProductos = async () => {
    try {

       await manager.getProducts();

        let product1 = await manager.addProduct("PR01", "Philadelphia", "Salmon, queso philadelphia y palta", 2100, "Philadelphia.jpg", 50)
        console.log(product1);

        let product2 = await manager.addProduct("PR02", "Tamago", "Salmon, queso philadelphia y ciboullette", 2400, "Tamago.jpg", 25)
        console.log(product2)
        
        let product3 = await manager.addProduct("PR03", "Soul", "Salmon y palmito, envuelto en queso", 2800, "Soul.jpg", 25)
        console.log(product3)

        let productoId= await manager.getProductById(2)
         console.log(productoId);

        let productAct = await manager.updateProduct(1, "Philadelphia");
         console.log(productAct);

        let deleteproduct1 = await manager.deleteProducts(3);
        console.log(deleteproduct1)
        
    } catch (error) {
        console.log(error);
    }
}
operacionesProductos();
*/