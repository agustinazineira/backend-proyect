import fs from "fs";

export default class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./files/Productos.json";
    }
    
    getProducts = async () => {
        try {     
            const data = await fs.promises.readFile(this.path, 'utf-8');
            
            const result = JSON.parse(data);
            return result;
        } catch (error) {
            console.error(`Error to read the file ${this.path}`);
            return [];
        }
    }

    addProduct = async (code, title, description, price, thumbnail, stock) => {
       
        try {
            let products = await this.getProducts();
            if (!code || !title || !description || !price || !thumbnail || !stock) {
                console.log("Obligatory fields")
                return;
            }
            let productRepeated = products.find((element) => element.code === code);
            if (productRepeated) {
                return `The field code ${code} is repeated so this product cannot be save in the list`;
            }
            const product = {
                code,
                title,
                description,
                price,
                thumbnail,
                stock,
                id: this.products.length + 1
            }
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try {
            if (fs.existsSync(this.path)) {
                const result = await this.getProducts();
                let indexValue = result.find((event) => event.id === id);
                if (!indexValue) {
                    return "This product with this ID does not exist in the file";
                } else {
                    return indexValue;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteProducts = async (id) => {
        const products = await this.getProducts()
        let productFounded = products.find((product) => product.id === id)
        if (productFounded) {
            try {
                const valor = this.products.filter((event) => event.id != id);

                this.products = valor;

                await fs.promises.writeFile(this.path, JSON.stringify(valor, null, "\t"))
                return "Product eliminated";
            } catch (error) {
                console.log(error);
            }
        } else {
            return `The product to delete with the id: ${id} does not exist in the list`
        }
    }

    updateProduct = async (id, code, title, description, price, thumbnail, stock) => {
        try {
            const products = await this.getProducts();
            if (products === "error") {
                return "The file is empty";
            }
            let productExists = products.find((product) => product.id === id)
            if (productExists != undefined) {
                const productToModify = products.filter((product) => product.id === id);
                const productModified = {
                    code: code ?? productToModify[0].code,
                    title: title ?? productToModify[0].title,
                    description: description ?? productToModify[0].description,
                    price: price ?? productToModify[0].price,
                    thumbnail: thumbnail ?? productToModify[0].thumbnail,
                    stock: stock ?? productToModify[0].stock,
                    id: id
                }
                products[id - 1] = productModified;
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
                return "Product updated";
            } else {
                return `The product to update with the id ${id} does not exist in the list`;
            }
        } catch (error) {
            console.log(error)
        }
    }
}
