
const mongoose = require("mongoose");

const { Schema } = mongoose;



const UserSchema = new Schema({

    username: String,
    pin: String,

    register: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', UserSchema);
