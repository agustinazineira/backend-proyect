import fs from "fs";
import express from "express";
import { Blob } from "buffer";


export default class ProductManager {
    constructor() {
        this.products = [];
        this.pathfiles = "./files";
        this.path = "./files/Products.json";
    }

    productServer = express();
    returnObject = async () => {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const result = JSON.parse(data);
        return result;
    }

    getProducts = async () => {
        try {
            if (!fs.existsSync(this.pathfiles)) {
                fs.mkdirSync(this.pathfiles)
            }
            if (fs.existsSync(this.path)) {

                const data = await fs.promises.readFile(this.path, 'utf-8');

                const size = new Blob([data]).size;
                if (size > 0) {
                    const result = JSON.parse(data);
                    return result;
                } else {
                    return [];
                }
            } else {
                return [];
            }
        } catch (error) {
            console.log(error)
        }

    }
    addProduct = async (productObject) => {

        try {

            productObject.stock > 0
                ? productObject = { status: true, ...productObject }
                : productObject = { status: false, ...productObject }

            const products = await this.getProducts();
            const productIndex = await products.findIndex((prod) => prod.code === productObject.code);

            if (productIndex === -1) {
                products.length === 0
                    ? productObject = { id: 1, ...productObject }
                    : productObject = { id: products[products.length - 1].id + 1, ...productObject }
                products.push(productObject);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
                return productObject;
            }

        } catch (error) {
            console.log(error);
        }
    }
    getProductById = async (id) => {
        try {
            if (fs.existsSync(this.path)) {
                const result = await this.getProducts();
                let indexValue = result.find((event) => event.id === id);
                return indexValue;
            }
        } catch (error) {
            console.log(error);
        }

    }
    deleteProducts = async (id) => {
        try {
            const products = await this.getProducts()
            let productFounded = products.findIndex((product) => product.id === id)
            if (productFounded !== -1) {
                const valor = products.filter((event) => event.id != id);
                await fs.promises.writeFile(this.path, JSON.stringify(valor, null, "\t"))
                return "Product eliminated";
            } else {
                return productFounded;
            }
        } catch (error) {
            console.log(error)
        }

    }
    updateProduct = async (idUpdate, productUpdate) => {
        try {
            const products = await this.getProducts();
            if (products === "error") {
                return "The file is empty";
            }
            let productExists = products.findIndex((product) => product.id === idUpdate)
            if (productExists !== -1) {

                const productToModify = products.filter((product) => product.id === idUpdate);

                const modifiedProduct = {
                    id: idUpdate,
                    title: productUpdate.title ?? productToModify[0].title,
                    description: productUpdate.description ?? productToModify[0].description,
                    code: productUpdate.code ?? productToModify[0].code,
                    status: productUpdate.status ?? productToModify[0].status,
                    price: productUpdate.price ?? productToModify[0].price,
                    category: productUpdate.category ?? productToModify[0].category,
                    thumbnail: productUpdate.thumbnail ?? productToModify[0].thumbnail,
                    stock: productUpdate.stock ?? productToModify[0].stock
                }
                products[idUpdate - 1] = modifiedProduct;

                //console.log(this.products)
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            } else {
                return productExists;
            }
        } catch (error) {
            console.log(error)
        }
    }
}