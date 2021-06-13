const express=require("express");
const router=express.Router();

const {requireSignin,isAuth} =require("./routecontroller");
const { userById } = require("./user");
const {generatetoken,procpayment}=require('./braintreecontroller.js')
router.get('/braintree/gettoken/:userId',requireSignin,isAuth,generatetoken)
router.post('/braintree/payment/:userId',requireSignin,isAuth,procpayment)
router.param('userId',userById)


module.exports=router;