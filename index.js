
const express = require("express");
const mongoose = require("mongoose");

const body_parser= require("body-parser");

const TypeCard = require("./src/models/TypeCard");
const { type_cards } = require("./src/HELPERS/type_cards");


const user_route= require("./src/routes/user_route");
const info_user_route= require("./src/routes/infoUser_route");
const transaction_route= require("./src/routes/transaction_route");



const app = express();


app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }))




// We configure our HEADER HTTP
app.use((req, res, next) => {
    
    res.header("Access-Control-Allow-Origin", "*");
 

    res.header(
        "Access-Control-Allow-Headers",
        "Authorization,usuario_autorizacion,  X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );

    // Pueden entrar estos métodos
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

    next();

});



app.use("/api", user_route);
app.use("/api", info_user_route);
app.use("/api", transaction_route);




app.listen(4000, async () => {
    console.log("Server running on port: 4000");
 
    try {
        await mongoose.connect("mongodb://localhost:27017/bank-saint-patrick");
        console.log("DB is connected.");


        TypeCard.find({}).then((data) => {
            // console.log(data);

            if (data.length === 0) {

                // console.log("Add types");


                type_cards.forEach((e) => {

                    // console.log(e);
                    var type_card = new TypeCard();

                    type_card.title = e;

                    type_card.save();

                    console.log(type_card);

                });

            }
        });


    } catch (error) {
        console.log(error);
    }

});