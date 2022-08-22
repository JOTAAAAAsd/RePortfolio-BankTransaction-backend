
const mongoose = require("mongoose");

const { Schema } = mongoose;



const TypeCardSchema = new Schema({

    title: String,

    user_own: String, // Será el usuario que posea dicha tarjeta...

 
    register: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('TypeCard', TypeCardSchema);
