const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read,
    remove,
    update,
    List,
    listRelated,
    listCategories,
    listBySearch,
    Listsearch,
    photo
} = require("./controller/product");
const { requireSignin, isAuth, isAdmin } = require("./controller/routecontroller");
const { userById } = require("./controller/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.get("/products",List);
router.get("/products/search",Listsearch)
router.get('/products/related/:productId',listRelated);
router.param("userId", userById);
router.param("productId", productById);
router.get('/products/categories',listCategories);
router.post('/products/by/search',listBySearch);
router.get('/product/photo/:productId',photo)


module.exports = router;
