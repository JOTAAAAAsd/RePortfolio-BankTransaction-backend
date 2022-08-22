
const { Router }= require("express");

const { register, toCompleteInfoUser, login }= require("../controllers/User");

const { userIsAuth }= require("../middlewares/userIsAuth");


const router= Router();

router.post("/user/register", register);

router.post("/user/to-complet-info-user", userIsAuth, toCompleteInfoUser);

router.post("/user/login",  login);


module.exports = router; 