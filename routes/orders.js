const express=require("express");
const router=express.Router();

const {requireSignin,isAuth, isAdmin} =require("./controller/routecontroller");
const { userById,order2userhistory } = require("./controller/user");
const {create,listOrders,getStatusValues,orderById,updateOrderStatus}=require('./controller/order')
const {decreasequantity}=require('./controller/product');

router.post('/order/create/:userId',
requireSignin,isAuth,order2userhistory,decreasequantity,create)
router.get('/order/list/:userId',requireSignin,isAuth,isAdmin,listOrders)
router.get('/order/status-values/:userId',requireSignin,isAuth,isAdmin,getStatusValues)
router.put('/order/:orderId/status/:userId',
requireSignin,
isAuth,isAdmin,

updateOrderStatus)
router.param('userId',userById)
router.param('orderId',orderById)


module.exports=router;