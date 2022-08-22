

const User = require("../models/User");
const Transaction = require("../models/Transaction");


// Para validar que sea un id objeto de mongoose. Debemos de introducir la id para que valide.
var ObjectId = require('mongoose').Types.ObjectId;


const { JWTDecode } = require("../HELPERS/JWT");
const InfoUser = require("../models/InfoUser");


/*
 TODO: 
 - Consultar si el usuario está autenticado y además este tiene la información de usuario ya cargada, ya que 
   en esta estará el monto/saldo que el usuario dispone.
 - Averiguar si el usuario tiene monto suficiente para pasar dinero.
 - Consultar si el usuario al que intentamos pasar existe, por medio de su número de tarjeta
*/

const postTransaction = (req, res) => {


    // Info User del usuario autenticado....
    const { id } = req.params;

    //user_id será el id del usuario a pasar
    const { user_id, num_card, mount } = req.body;

    var id_mongo_validate = ObjectId.isValid(id);
    // console.log(id_mongo_validate); 


    if (id_mongo_validate) {

        // VALIDAMOS QUE EL USUARIO TOKEN DECODE COINCIDA CON EL ID DEL USUARIO REFERENCIADO AL USUARIO
        const get_headers = req.headers.usuario_autorizacion;
        // console.log(get_headers);
        // console.log(JWTDecode(get_headers));


        // Mismo usuario para también tomar su monto y dependiendo de este poder efectuar el pase
        var user_id_isExists = User.findOne({ _id: JWTDecode(get_headers).id });
        var info_user_id_isExists = InfoUser.findOne({ user_id: JWTDecode(get_headers).id });


        Promise.all([user_id_isExists, info_user_id_isExists]).then((mix_result) => {

            // console.log(mix_result[0]);
            // console.log(mix_result[1]);

            if (mix_result[0]._id.toString() === mix_result[1].user_id.toString()) {

                // res.send("Son iguales");

                var mount_balance = parseFloat(mix_result[1].balance).toFixed(2);

                // console.log(mount_balance);

                // Debe tener más de 99 para poder hacer envíos
                if (mount_balance < 100 || mount_balance < mount) {

                    res.send("No cuenta con suficiente dinero para enviar.")


                } else {

                    var num_card_user_exists = InfoUser.findOne({ num_card: num_card }).exec();


                    num_card_user_exists.then((data) => {

                        if (!data) {

                            res.status(500).json({
                                ok: false,
                                message: "Doesn´t exists"
                            });

                        } else {

                            // ACTUALIZACION SALDO :D

                            // console.log(mount_balance);
                            const body1 = {
                                balance: (Number.parseFloat(mount_balance) - mount).toFixed(2)
                            };

                            var body2 = {
                                balance: (Number.parseFloat(data.balance) + mount).toFixed(2)
                            };

                            // console.log(body1, body2);

                            InfoUser.findByIdAndUpdate({ _id: id }, body1, (error, stored) => {

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

                                        InfoUser.findByIdAndUpdate({ _id: data._id }, body2, (error, stored) => {

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

                                                    const transaction = new Transaction();

                                                    transaction.user_id = user_id;
                                                    transaction.another_user_id = data.user_id;
                                                    transaction.num_card = num_card;
                                                    transaction.mount = mount;

                                                    transaction.save();

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

                        }
                    })

                }
            }

        });

    } else {
        res.status(500).json({
            ok: false,
            message: "Id param entered is not valid."
        });
    }


}




const getTransaction = (req, res) => {


    // VALIDAMOS QUE EL USUARIO TOKEN DECODE COINCIDA CON EL ID DEL USUARIO REFERENCIADO AL USUARIO
    const get_headers = req.headers.usuario_autorizacion;
    // console.log(get_headers);
    // console.log(jwt_decodeToken(get_headers));


    if (get_headers) {
        var user_id_isExists = User.findOne({ _id: JWTDecode(get_headers).id }).exec();

        user_id_isExists.then((data_user) => {

            if (!data_user) {
                res.status(500).json({
                    ok: false,
                    message: "User not found."
                });

            } else {

                if (data_user._id.toString() !== JWTDecode(get_headers).id) {

                    res.status(500).json({
                        ok: false,
                        message: "User id not match. "
                    });

                } else {

                    Transaction.find({ user_id: data_user._id }).sort('-register').populate(["user_id", "another_user_id"])
                        .then((data) => {


                            if (data.length === 0) {
                                res.status(404).json({
                                    ok: false,
                                    message: "No there Project registered."
                                });

                            } else {
                                res.status(200).json({
                                    ok: true,
                                    message: "Getting Project.",
                                    data: data
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



module.exports = {
    postTransaction,
    getTransaction
}