import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";

import socket from './socket.js'
import mongoose from "mongoose";
import dotenv from "dotenv";
import productsRouter from './routes/products.router.js';
import cartrouter from './routes/cart.router.js'
import viewrouter from './routes/views.router.js'
import chatRouter from "./routes/chat.router.js"
dotenv.config();
const productServer = express();

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database=process.env.DB_NAME
productServer.use(express.json());
productServer.use(express.static(`${__dirname}/public`));
productServer.use(express.urlencoded({ extended: true }));


productServer.engine("handlebars", handlebars.engine());
productServer.set("views", `${__dirname}/views`);
productServer.set("view engine", "handlebars");
productServer.use(express.static(`${__dirname}/public`));


const httpServer = productServer.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
        console.log(password)
    } catch (error) {
        console.log(error);
    }
});
mongoose.connect(
    `mongodb+srv://agus2465:FjNfgNb6TRJ4xlRJ@cluster0.timqa3m.mongodb.net/?retryWrites=true&w=majority`
)

//productServer.use("/chat",chatRouter);
productServer.use("/", viewrouter);
productServer.use("/api/products", productsRouter);

productServer.use("/api/carts", cartrouter);
socket.connect(httpServer)








