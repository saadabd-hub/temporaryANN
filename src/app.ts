import express, { NextFunction } from "express";
import cors from "cors";
import mongooseconnect from "../src/configs/mongoose";
import routes from "../src/routes";
import jwt from "jsonwebtoken";
import User from "./models/UserModel";

require('dotenv').config()


const app = express();
const PORT = 3500;

mongooseconnect();

var corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, () => console.log(`server running on localhost://${PORT}`));
