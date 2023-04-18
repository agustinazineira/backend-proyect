import { cartModel } from "../models/cart.model.js"
import { productModel } from "../models/product.model.js"
export default class cartdbManager {
  constructor() { }
  getCarts = async () => {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      console.log(error);
    }
  };
  getCartsbyId = async (cid) => {
    try {
      const productByid = await cartModel.findOne({ _id: cid }).lean();
      return productByid;
    } catch (error) {
      console.log(error);
    }
  };
  createCart = async (cart) => {
    try {
      const productCreated = await cartModel.create(cart);
      return productCreated;
    } catch (error) {
      console.log(error);
    }
  };
  addProducttoCart = async (cid, pid, quantity) => {
    try {
      let cartFound = await cartModel.findOne({ _id: cid });

      const productIdInCart = cartFound.products.findIndex((product) => {
        return product.productId._id.toString() === pid;
      });

      if (productIdInCart !== -1) {
        if (isNaN(quantity) || quantity <= 0) {
          await cartModel.updateOne(
            { _id: cid, "products.productId": pid },
            { $inc: { "products.$.quantity": 1 } }
          );
          const updatedCartWithProduct = await cartModel.findOne({ _id: cid });
          return updatedCartWithProduct;
        } else {
          await cartModel.updateOne(
            { _id: cid, "products.productId": pid },
            { $inc: { "products.$.quantity": Number.parseInt(quantity) } }
          );
          const updatedCartWithProduct = await cartModel.findOne({ _id: cid });
          return updatedCartWithProduct;
        }

      } else {
        const productAddToCart = {
          productId: pid,
          quantity: quantity ? quantity : 1,
        };
        await cartModel.updateOne(
          { _id: cid },
          { $push: { products: productAddToCart } }
        );
        const updatedCartWithProduct = await cartModel.findOne({ _id: cid });
        return updatedCartWithProduct;
      }

    } catch (error) {
      console.log(error)
    }
  }
  updateCart = async (cid, cart) => {
    try {
      const cartUpdated = await cartModel.updateOne({ _id: cid }, { products: cart })
      return cartUpdated
    } catch (error) {
      console.log(error)
    }
  }
  updateProductFromCart = async (cid, pid, quantity) => {
    try {
      let updatedCartProduct;
      if (isNaN(quantity) || quantity < 0) {
        updatedCartProduct = await cartModel.updateOne(
          { _id: cid, "products.productId": pid },
          { "products.$.quantity": 1 }
        );
      }else{
        updatedCartProduct = await cartModel.updateOne(
          { _id: cid, "products.productId": pid },
          { "products.$.quantity": quantity })
      }

      return updatedCartProduct;
    } catch (error) {
      console.log(error);
    }
  };
  deleteCart = async (cid) => {
    try {
      const cart = await cartModel.findOne({ _id: cid })
      console.log(cart.products);
      const cartDeleted = await cartModel.updateOne({ _id: cid }, { products: [] });
      return cartDeleted
    } catch (error) {
      console.log(error)
    }
  }
  deleteproductfromCart = async (cid, pid) => {
    try {

      const productEliminated = await cartModel.updateOne(
        { _id: cid },
        { $pull: { products: { productId: pid } } }
      );

      return productEliminated;
    } catch (error) {

    }
  }
}