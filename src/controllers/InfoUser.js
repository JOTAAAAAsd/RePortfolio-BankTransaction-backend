
const InfoUser = require("../models/InfoUser");

const User = require("../models/User");

// Para validar que sea un id objeto de mongoose. Debemos de introducir la id para que valide.
var ObjectId = require('mongoose').Types.ObjectId;

const { JWTDecode } = require("../HELPERS/JWT");



const balanceRecharge = (req, res) => {

    const { id } = req.params;


    const { balance } = req.body;

    var id_mongo_validate = ObjectId.isValid(id);


    // console.log(id_mongo_validate); // True is valid | False not valid

    if (id_mongo_validate) {
        // VALIDAMOS QUE EL USUARIO TOKEN DECODE COINCIDA CON EL ID DEL USUARIO REFERENCIADO AL USUARIO
        const get_headers = req.headers.usuario_autorizacion;
        // console.log(get_headers);
        // console.log(JWTDecode(get_headers));

        if (get_headers) {

            var user_id_isExists = User.findOne({ _id: JWTDecode(get_headers).id }).exec();


            user_id_isExists.then((data_user) => {
                // console.log(data_user._id.toString());

                var info_user_id_isExists = InfoUser.find({ _id: id, user_id: data_user._id }).exec();


                info_user_id_isExists.then((data) => {
                    // console.log(data);


                    if (data.length === 0) {
                        res.status(404).json({
                            ok: false,
                            message: "No there Info User with that id registered.",
                        });

                    } else {

                        if (!balance || balance === 0) {

                            res.status(404).json({
                                ok: false,
                                message: "The field Balance is required."
                            });


                        } else {

                            // console.log(Number.parseFloat(data[0].balance) + balance)
  

                             var body_content = {
                                balance: (Number.parseFloat(data[0].balance) + balance).toFixed(2)
                            };

                            InfoUser.findByIdAndUpdate({ _id: id }, body_content, (error, stored) => {

                                if (error) {
                                    res.status(500).json({
                                        ok: false,
                                        message: "Server Error"
                                    });

                                } else {

                                    if (!stored) {
                                        res.status(404).json({
                                            ok: false,
                                            message: "No Info User there with that id registered"
                                        });

                                    } else {

                                        res.status(201).json({
                                            ok: true,
                                            message: "Resource updated successfully"
                                        });
                                    }
                                }
                            });
                        }
                    }
                });

            });

        } else {

            res.status(500).json({
                ok: false,
                message: "No Token."
            });
        }


    } else {

        res.status(500).json({
            ok: false,
            message: "Id param entered is not valid."
        });
    }


}

const getInfoUser = (req, res) => {

    const get_headers = req.headers.usuario_autorizacion;

    // console.log(get_headers);
    // console.log(JWTDecode(get_headers).id);

    if (get_headers) {

        var user_id_isExists = User.findOne({ _id: JWTDecode(get_headers).id }).exec();

        user_id_isExists.then((data_user) => {
            // console.log(data_user);

            if (!data_user) {
                res.status(500).json({
                    ok: false,
                    message: "User not found."
                });

            } else {

                // console.log(data_user.id.toString(), JWTDecode(get_headers).id);
                if (data_user._id.toString() !== JWTDecode(get_headers).id) {

                    res.status(500).json({
                        ok: false,
                        message: "User id not match. "
                    });

                } else {

                    const info_user_id_isExists = InfoUser.findOne({ user_id: data_user._id.toString() });

                    info_user_id_isExists.then((data) => {
                        // console.log(data);

                        if (!data) {
                            res.status(500).json({
                                ok: false,
                                message: "User id not match. "
                            });

                        } else {

                            InfoUser.find({}).populate("user_id").then((data) => {
                                // console.log(data);

                                if (data.length === 0) {

                                    res.status(201).json({
                                        ok: false,
                                        message: "No there data registered."
                                    });

                                } else {

                                    res.status(200).json({
                                        ok: true,
                                        message: "Getting Resource.",
                                        data: data
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });

    } else {
        res.status(500).json({
            ok: false,
            message: "No Token."
        });
    }

}


const updateInfoUser = (req, res) => {

    const { id } = req.params;


    const { name, lastname, street, country, city, location, cardholder } = req.body;


    var id_mongo_validate = ObjectId.isValid(id);


    // console.log(id_mongo_validate); // True is valid | False not valid

    if (id_mongo_validate) {
        // VALIDAMOS QUE EL USUARIO TOKEN DECODE COINCIDA CON EL ID DEL USUARIO REFERENCIADO AL USUARIO
        const get_headers = req.headers.usuario_autorizacion;
        // console.log(get_headers);
        // console.log(JWTDecode(get_headers));


        if (get_headers) {

            var user_id_isExists = User.findOne({ _id: JWTDecode(get_headers).id }).exec();


            user_id_isExists.then((data_user) => {
                // console.log(data_user._id.toString());

                var info_user_id_isExists = InfoUser.find({ _id: id, user_id: data_user._id }).exec();


                info_user_id_isExists.then((data) => {
                    // console.log(data);


                    if (data.length === 0) {
                        res.status(404).json({
                            ok: false,
                            message: "No there Info User with that id registered.",
                        });

                    } else {

                        if (name.trim() === "" || lastname.trim() === "" || street.trim() === "" || country.trim() === "" || city.trim() === ""
                            || location.trim() === "" || cardholder.trim() === "") {

                            res.status(404).json({
                                ok: false,
                                message: "All fields are required."
                            });


                        } else {

                            var body_content = {
                                name: name,
                                lastname: lastname,
                                street: street,
                                country: country,
                                city: city,
                                location: location,
                                cardholder: cardholder

                            };


                            InfoUser.findByIdAndUpdate({ _id: id }, body_content, (error, stored) => {

                                if (error) {
                                    res.status(500).json({
                                        ok: false,
                                        message: "Server Error"
                                    });

                                } else {

                                    if (!stored) {
                                        res.status(404).json({
                                            ok: false,
                                            message: "No Info User there with that id registered"
                                        });

                                    } else {

                                        res.status(201).json({
                                            ok: true,
                                            message: "Resource updated successfully"
                                        });
                                    }

                                }
                            });

                        }

                    }
                });

            });

        } else {

            res.status(500).json({
                ok: false,
                message: "No Token."
            });

        }


    } else {

        res.status(500).json({
            ok: false,
            message: "Id param entered is not valid."
        });
    }
}







module.exports = {
    balanceRecharge,
    getInfoUser,
    updateInfoUser

}