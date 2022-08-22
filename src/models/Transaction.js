
const mongoose = require("mongoose");

const { Schema } = mongoose;
 

const TransactionSchema = new Schema({

    // usuario que realiza la transacción
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    another_user_id:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    num_card: String, // Número de tarjeta del usuario "existente" a pasar

    mount: { type: mongoose.Types.Decimal128 }, // Saldo que se le pasará al usuario
 
    register: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Transaction', TransactionSchema);
