
const { Router }= require("express");

const { postTransaction, getTransaction }= require("../controllers/Transaction");

const { userIsAuth }= require("../middlewares/userIsAuth");


const router= Router();


router.put("/transaction/post-transaction/:id", userIsAuth, postTransaction);

 
router.get("/transaction/get-transaction", userIsAuth, getTransaction);


module.exports = router; 