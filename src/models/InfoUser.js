
const mongoose = require("mongoose");

const { Schema } = mongoose;



const InfoUserSchema = new Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    name: String,
    lastname: String,
    street: String, // domicilio de la persona
    country: String, // país de la persona
    city: String, // ciudad de la persona
    location: String, // ubicación de la persona, sería como la localidad de la ciudad
    cardholder: String, // titular de la tarjeta
    num_card: String, // Número de la tarjeta que se le creeará automática una vez el usuario esté registrado
    balance: { type: mongoose.Types.Decimal128 }, // Saldo que el usuario dispone

    num_cards: String, // referenciamos la card perteneciente al usuario (cantidad de tarjetas que este usuario tiene)
    card_type: String, // MasterCard | Visa | etc.

    register: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Info_User', InfoUserSchema);
