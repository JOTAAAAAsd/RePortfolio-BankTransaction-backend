
const { Router }= require("express");

const { balanceRecharge, getInfoUser, updateInfoUser }= require("../controllers/InfoUser");

const { userIsAuth }= require("../middlewares/userIsAuth");


const router= Router();


router.put("/info-user/post-balance/:id", userIsAuth, balanceRecharge);

router.get("/info-user/get", userIsAuth, getInfoUser);

router.put("/info-user/put/:id", userIsAuth, updateInfoUser);




module.exports = router; 