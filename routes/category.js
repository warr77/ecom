const express = require("express");
const router = express.Router();

const {categorybyId} = require("./controller/test");
const { requireSignin, isAuth, isAdmin } = require("./controller/routecontroller");
const { userById } = require("./controller/user");
const{ read} = require("./controller/category");

router.get("/cate/:categoryId",read);      


router.param("categoryId", categorybyId);

//router.param("userId", userById);


module.exports = router;