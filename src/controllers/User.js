
const User = require("../models/User");
const InfoUser = require("../models/InfoUser");

var bcrypt = require('bcryptjs');

const { numcardRandom } = require("../HELPERS/numCardRandom");
const { JWTEncode, JWTDecode } = require("../HELPERS/JWT");


const register = (req, res) => {

    const { username, pin, repeat_pin } = req.body;

    const user = new User();


    if (username.trim() === "" || pin === "") {

        res.status(500).json({
            ok: false,
            message: "The field username and pin are required."
        });

    } else if (pin !== repeat_pin) {
        res.status(500).json({
            ok: false,
            message: "The pin should be equal."
        });

    } else {

        var user_isExist = User.findOne({ username: username }).exec();

        user_isExist.then((data) => {
            // console.log(data);

            if (!data) {
                user.username = username;

                var pin_hash = bcrypt.hashSync(pin, 10);

                user.pin = pin_hash;

                // console.log(user);

                // empty
                user.name = "";
                user.lastname = "";
                user.street = "";
                user.country = "";
                user.city = "";
                user.location = "";
                user.cardholder = "";
                user.balance = "";
                user.num_card = "";

                user.save();

                res.status(201).json({
                    ok: true,
                    message: "Resource created successfully",
                    token_access: JWTEncode(user)
                });

            } else {
                res.status(500).json({
                    ok: true,
                    message: "Resource already created."
                });
            }
        });
    }
}


const toCompleteInfoUser = (req, res) => {

    const { name, lastname, street, country, city, location, cardholder } = req.body;

    const user_id = JWTDecode(req.headers.usuario_autorizacion).id;

    // console.log(user_id);

 

    var user_isExist = User.findOne({ _id: user_id }).exec();


    user_isExist.then((data) => {
        // console.log(data);

        if (!data) {
            res.status(500).json({
                ok: true,
                message: "Resource doesn´t exists."
            });

        } else {

            if (name.trim() === "" || lastname.trim() === "" || street.trim() === "" || country.trim() === "" ||
                city.trim() === "" || location.trim() === "" || cardholder.trim() === "") {

            } else {

                InfoUser.findOne({ user_id: user_id }).populate("user_id").then((data_info_user) => {

                    console.log(data_info_user);

                    if (!data_info_user) {
 
                        const info_user = new InfoUser();

                        info_user.user_id = user_id;
                        info_user.name = name;
                        info_user.lastname = lastname;
                        info_user.street = street;
                        info_user.country = country;
                        info_user.city = city;
                        info_user.location = location;
                        info_user.cardholder = cardholder;
                        info_user.balance = 0.00.toFixed(2);
                        info_user.num_card = numcardRandom();

                        info_user.save();

                        res.status(201).json({
                            ok: true,
                            message: "Resource created successfully."
                        });

                    } else {
 
                        res.status(500).json({
                            ok: false,
                            message: "Resource already created."
                        });
                    }

                });
            }
        }
    });

}


const login = (req, res) => {


    const { username, pin } = req.body;

    if (username.trim() === "" || pin.trim() === "") {

        res.status(500).json({
            ok: false,
            message: "The field username and pin are required."
        });

    } else {

        var user_isExist = User.findOne({ username: username }).exec();

        user_isExist.then((data) => {

            if (data) {
                // Load hash from your password DB.
                bcrypt.compare(pin, data.pin, function (error, result) {

                    if (error) {
                        res.status(500).json({
                            ok: false,
                            message: "Server Error."
                        });

                    } else if (!result) {
                        res.status(404).json({
                            ok: false,
                            message: "Password Incorrect."
                        });

                    } else {

                        res.status(200).json({
                            ok: true,
                            mensaje: "User logged correctly.",
                            // user: data,
                            token_access: JWTEncode(data),
                        });
                    }
                });

            } else {
                res.status(500).json({
                    ok: false,
                    message: "User doesn´t exists."
                });
            }

        });
    }
}


module.exports = {

    register,
    toCompleteInfoUser,
    login
}





