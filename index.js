import express from "express";
import dotenv from "dotenv";
import CharactersRouter from "./routes/Character.js"
import morgan from "morgan";
dotenv.config();
const { EXPRESS_PORT } = process.env;
const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use('/Characters', CharactersRouter)
//Apertura porta
app.listen(EXPRESS_PORT, () => {
    console.log(`Server in ascolto nella porta ${EXPRESS_PORT}`);
})