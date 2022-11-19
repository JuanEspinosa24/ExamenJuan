import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDb } from './database.js';

import { dirname } from "path";
import { fileURLToPath } from "url";

//rutas
import postRoutes from "./routes/post.routes.js";

import loginRoutes from "./routes/login.routes.js";

import categoryRoutes from "./routes/category.routes.js";

import productRoutes from "./routes/product.route.js";

connectDb();

const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);

const app=express();

app.set('Port',4000);

app.use("/public",express.static(__dirname + "/storage/imgs"));
//sapo

app.use(morgan('dev'));
app.use(cors({origin: '*'}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/user/login", loginRoutes);

app.use("/user/register", postRoutes);

app.use("/category", categoryRoutes);

app.use("/product", productRoutes);

app.listen(app.get('Port'),()=>{console.log('servidor', app.get('Port'));});