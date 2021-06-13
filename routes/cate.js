const express = require("express");
const router = express.Router();

const { create ,
    categoryById,
    read,
    update,
    remove,
    list} = require("./controller/category");
const { requireSignin, isAuth, isAdmin } = require("./controller/routecontroller");
const { userById } = require("./controller/user");

router.post("/category/create/:userId", requireSignin, isAuth,isAdmin, create);
router.get("/category/:categoryId", read);      
router.put(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/categories", list);

router.param("categoryId", categoryById);

router.param("userId", userById);


module.exports = router;