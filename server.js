const express = require('express');
const dotenv = require('dotenv');
const app = express();

const { connectDB } = require("./config/index");

dotenv.config();

connectDB();


const port = process.env.PORT | 5500;

app.get("/", (req, res) => {
    res.json({msg: "Hello world"});
});

app.listen(port, () => {
    console.log("Serveur lancer sur le port "+ port);
});