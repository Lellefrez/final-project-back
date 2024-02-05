import express from "express";
import dotenv from "dotenv";
import CharactersRouter from "./routes/Character.js"
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose"

dotenv.config();
const { EXPRESS_PORT, MONGO_URI } = process.env;

const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ origin: "*" }));
app.use('/Characters', CharactersRouter)

//Connsessione a Mondo

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connesso a MondoDB');
        //Apertura porta, avvio server
        app.listen(EXPRESS_PORT, () => {
            console.log(`Server in ascolto nella porta ${EXPRESS_PORT}`);
        })
    })
    .catch((err) => console.log('Errorre nella connessione a MondoDB'));
