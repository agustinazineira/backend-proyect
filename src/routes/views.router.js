import ProductManager from '../dao/dbManagers/productdbManager.js';
import { Router } from "express";


const router = Router();
const productmanager=new ProductManager();

router.get("/", async (req, res) => {
    const { limit = 2, page = 1, category, usable, sort } = req.query;
    const {
      docs: products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
    } = await productmanager.getProducts(page, limit, category, usable, sort);
    res.render("products", {
      products,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    //   style: "styles.css",
    //   title: "Products",
    });
})

router.get("/product/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productmanager.getProductsbyId(pid);
  res.render("product", {
    product,
    // style: "styles.css",
    // title: "Product Detail",
  });
});
// router.get("/realtimeproducts", async (req,res)=>{
   
//     res.render("realTimeProducts",{});

export default router;