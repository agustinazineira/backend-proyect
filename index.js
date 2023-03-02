class ProductManager{
    #products

    constructor() {
        this.#products = []
    }    

    getProducts = () => {
        return this.#products
    }

    createProduct = (tittle, description, price, thumbnail, stock, productId) => {
        const product = {
            id: this.#products.length +1,
            code,
            tittle,
            description,
            price,
            thumbnail,
            stock,
        }

        this.#products.push(product)

        const field = this.#products.find((product) => product.id === productId)

        if(!code||!tittle||!description||!price||!thumbnail||!stock){
            return ("Obligatory fields")            
        }

        const productExists = this.#products.includes(productId)

        const newProduct = {
            ...product,
        }

        if(productExists){
            console.log("The product almost exist")
            return
        }else{
            return newProduct   
        }

    }


    getProductById = (productId) => {
        const productIndex = this.#products.findIndex((product) => product.id === productId)

        if(productIndex === -1){
            console.error("Not found")
            return
        }else{
            return product
        }
    }
}

const productManager = new ProductManager

productManager.createProduct("Smart tv", "Ultra HD 4k 55 pulgadas", 95000, "./assets/smart.jpg", 12)

productManager.getProducts()

const fs = require("fs");

const fecha = new Date().toString();

fs.writeFile("./archivo-hora.txt", fecha, (error) => {
  if (error) return console.log("Error al crear el archivo");

  fs.readFile("./archivo-hora.txt", "utf-8", (error, resultado) => {
    if (error) return console.log("Error al leer el archivo");
    console.log(resultado);
  });
});
