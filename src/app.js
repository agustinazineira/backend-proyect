import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import socket from './socket.js'
import morgan from "morgan"
import session from "express-session";
import MongoStore from "connect-mongo";
import productsRouter from './routes/products.router.js';
import cartrouter from './routes/cart.router.js'
import viewrouter from './routes/views.router.js'
import database from "./db.js";
import config from "./config.js";
import sessionsRouter from "./routes/sessions.router.js"
import passport from "passport";
import initializePassport from "./auth/passport.js";
// import passport from "passport";
// import initializePassport from "../middlewares/passport.js";

//Initialization
const productServer = express();

//Middlewares
productServer.use(express.json());
productServer.use(express.static(`${__dirname}/public`));
productServer.use(express.urlencoded({ extended: true }));
productServer.use(express.static(`${__dirname}/public`));
productServer.use(morgan("dev"))

productServer.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.dbUrl,
      ttl:60
    }),
    resave: true,
    saveUninitialized: false,
    secret: config.sessionSecret,
  })
);
initializePassport()
productServer.use(passport.initialize())
productServer.use(passport.session())

//View engine
productServer.engine("handlebars", handlebars.engine());
productServer.set("views", `${__dirname}/views`);
productServer.set("view engine", "handlebars");



const httpServer = productServer.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");

    } catch (error) {
        console.log(error);
    }
});
database.connect();
//productServer.use("/chat",chatRouter);
productServer.use("/api/sessions", sessionsRouter);

productServer.use("/api/products", productsRouter);

productServer.use("/api/carts", cartrouter);
productServer.use("/", viewrouter);
socket.connect(httpServer)













