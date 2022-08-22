
const jwt = require("jwt-simple");

const moment = require("moment");


const KEYWORD_JWT = "haskldjalsñdslakd{lañskjbhsvjnckasjnkdlasjkasdasd";


const JWTEncode = (obj_payload) => {

    const payload = {
        id: obj_payload._id,
        username: obj_payload.username,
        pin: obj_payload.pin,

        token_created: moment().unix(),
        token_expiration: moment().add(3, "hours").unix() // 3hs
    };

    // console.log(payload);

    const token_encode = jwt.encode(payload, KEYWORD_JWT);

    return token_encode;

}


const JWTDecode = (token) => {


    // console.log(token);

    var user_decoded = jwt.decode(token, KEYWORD_JWT, true);

    // console.log(user_decoded);

    return user_decoded;

}


module.exports = {
    KEYWORD_JWT,
    JWTEncode,
    JWTDecode

}