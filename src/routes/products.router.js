// import ProductManager from '../dao/fileManagers/ProductManager.js';
import { Router } from "express";
import { uploader } from '../utils.js';
import ProductdbManager from "../dao/dbManagers/productdbManager.js";
import { productModel } from "../dao/models/product.model.js";

const router = Router();


const productdbManager = new ProductdbManager();
router.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, category = null, available = null, sort = null } = req.query


        console.log(category, available)
        let consulta = await productdbManager.getProducts(page, limit, category, available, sort);

        return res.send({ status: "Success", payload: consulta });

    } catch (error) {
        console.log(error)
    }
});

router.get("/:pid", async (req, res) => {
    try {
        let { pid } = req.params


        const consultaId = await productdbManager.getProductsbyId(pid);
        if (!consultaId) {
            return res
                .status(400)
                .send({ status: "error", error: "The product does not exists" });
        }
        return res.send({ status: "success", payload: consultaId });
        // if (typeof (consultaId) === "string") {
        //     return res.status(400).send({ status: "error", message: consultaId });
        // }
        // return res.status(200).send({
        //     status: "success",
        //     message: { product: consultaId },
        // });

    } catch (error) {
        console.log(error);
    }
});
//router.post("/", uploader.array("thumbnails"), async (req,
// router.post("/", async (req, res) => {
//     try {
//         let product = req.body;
//         console.log(product);
//         if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
//             return res.status(400).send({
//                 status: "error",
//                 message: { error: "All the fields must not be empty" },
//             });
//         }

//         const products = await manager.getProducts()
//         const productIndex = await products.findIndex((prod) => prod.code === product.code);
//         if (productIndex !== -1) {
//             return res.status(400).send({
//                 status: "error",
//                 message: { error: `The product with the code${product.code} exist in the list` },
//             });
//         }
//         // if (req.files) products.thumbnail = req.files;
//         // console.log(req.files)
//         // if (!req.files && !products.thumbnail) {
//         //     return res.status(400).send({
//         //         status: "error",
//         //         message: { error: `No se pudieron guardar las miniaturas` },
//         //     });
//         // }
//         //  product = await manager.addProduct(product);
//         //return res.send(product);
//         return res.status(201).send({
//             status: "success",
//             message: {
//                 success: `Product ${product.title} successfully added`,
//                 id: `${product.id}`,
//             },
//         });

//     } catch (error) {
//         console.log(error)
//     }
// })
// router.post("/", uploader.array("thumbnails"), async (req, res) => {
//     let product = req.body;

//     let filesToadd = req.files
//     console.log(product)



//     if (!filesToadd) {
//         return res.status(400).send({
//             status: "error",
//             message: { error: `No se pudieron guardar las miniaturas` },
//         });
//     }
//     product.thumbnails = [];
//     if (filesToadd) {
//         filesToadd.forEach(files => {
//             const imgUrladd = `http://localhost:8080/images/${files.filename}`;
//             product.thumbnails.push(imgUrladd)
//         });
//     }
//     let result = await manager.addProduct(product);

//     if (typeof (result) === "string") {
//         return res.status(400).send({
//             status: "error",
//             message: { error: result },
//         });
//     }


//     res.status(201).send({
//         status: "success",
//         message: {
//             success: `Product successfully added`

//         },
//     });
// });
router.post("/", uploader.array("thumbnails"), async (req, res) => {
    let product = req.body;





    const filesToUpdate = req.files

    product.thumbnails = [];

    // if (req.files) thumbnails = req.files;

    // if (!req.files) {
    //   return res.status(400).send({
    //     status: "error",
    //     error: `Thumbnails could not be saved`,
    //   });
    // }
    if (filesToUpdate) {
        console.log(filesToUpdate)
        filesToUpdate.forEach(files => {
            const imgUrlUpdate = `http://localhost:8080/images/${files.filename}`;
            product.thumbnails.push(imgUrlUpdate)
        });
    }
    const createProduct = await productdbManager.createProduct(product);
    if (!createProduct) {
        return res
            .status(400)
            .send({ status: "error", error: "Product already exists" });
    }
    return res.send({ status: "success", payload: createProduct });


});

router.put("/:pid", uploader.array("thumbnails"), async (req, res) => {
    try {
        // let { title, description, code, price, stock, category, thumbnails } =
        // req.body;

        const product = req.body;
        const { pid } = req.params;


        const filesToUpdate = req.files

        product.thumbnails = [];

        // if (req.files) thumbnails = req.files;

        // if (!req.files) {
        //   return res.status(400).send({
        //     status: "error",
        //     error: `Thumbnails could not be saved`,
        //   });
        // }
        if (filesToUpdate) {
            console.log(filesToUpdate)
            filesToUpdate.forEach(files => {
                const imgUrlUpdate = `http://localhost:8080/images/${files.filename}`;
                product.thumbnails.push(imgUrlUpdate)
            });
        }


        const result = await productdbManager.updateProduct(product, pid);
        if (!product) {
            return res.send({ status: "error", error: "Incomplete values" });
        }

        return res.send({ status: "success", payload: result });
    } catch (error) {
        console.log(error);
    }
})
// router.put("/:pid", uploader.array("thumbnails"), async (req, res) => {
//     try {
//         const product = req.body;
//         const id = req.params.pid;
//         const filesToUpdate=req.files

//         product.thumbnails = [];
//         if (filesToUpdate) {
//             filesToUpdate.forEach(files => {
//                 const imgUrlUpdate = `http://localhost:8080/images/${files.filename}`;
//                 product.thumbnails.push(imgUrlUpdate)
//             });
//         }
//         let result = await manager.updateProduct(Number.parseInt(id), product);

//         if (typeof (result) === "string") {
//             return res.status(404).send({
//                 status: "error",
//                 message: { error: result },
//             });
//         }
//         return res.status(200).send({
//             status: "success",
//             message: { update: `The product was updated` },
//         });
//     } catch (error) {
//         console.log(error);
//     }
// })
router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        let result = await productdbManager.deleteProduct(pid);
        if (!result) {
            return res.status(404).send({
                status: "error",
                error: "Could not delete this product. No products founded with this ID in the database",
            });
        }
        res.send({ status: "Success", payload: result });

        // const id = req.params.pid;
        // console.log(id)

        // let result = await manager.deleteProducts(id);
        // if (typeof (result) === "string") {
        //     return res.status(404).send({
        //         status: "error",
        //         message: { error: result },
        //     });
        // }

        // return res.status(200).send({
        //     status: "success",
        //     message: {
        //         delete: `The product was sucessfully eliminated`,
        //     },
        // });

    } catch (error) {
        console.log(error);
    }
});

export default router;