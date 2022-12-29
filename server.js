const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./graphql/schema");
const { connectDB } = require("./config/index");

// const { createJwtToken } = require("./utils/auth");
const { authenticate } = require("./middleware/auth");

const app = express();


dotenv.config();

connectDB();

app.use(authenticate);


// app.get("/", (req, res) => {
//     console.log(req.verifiedUser)
//     res.json({ msg: "Salut! Allez sur /graphql" });
// });

// app.get("/authtest", (req, res) => {
//     res.json(createJwtToken({
//         username: "freddy",
//         email: "michelfreddy1992@gmail.com",
//         name: "Freddy",
//         lastname: "Michel",
//         displayName: "Freddy Michel"
//     }))
// })

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));
const port = process.env.PORT | 5500;

app.listen(port, () => {
    console.log("Serveur lancer sur le port "+ port);
});