
const User=require('../model/auth');
const braintree=require('braintree');
require('dotenv').config();

const gateway=new braintree.BraintreeGateway({
    environment:braintree.Environment.Sandbox,
    publicKey:process.env.Braintree_Public_key,
    merchantId:process.env.Braintree_Merchant_id,
    privateKey:process.env.Braintree_Private_key
})

exports.generatetoken=(req,res)=>{
gateway.clientToken.generate({},function(err,response){
    if(err){
        res.status(500).send("cannot connect");

    }else{
        res.send(response);
    }
})

}

exports.procpayment=(req,res)=>{
let noncefromtheclient=req.body.paymentMethodNonce;
let amountfromtheclient=req.body.amount;
let newTransection=gateway.transaction.sale({
    amount:amountfromtheclient,
    paymentMethodNonce:noncefromtheclient,
    options:{

submitForSettlement: true
    }
},(error,result)=>{
    if(error){
        res.status(500).json(error);
        
    }else{
        //console.log(result);
    res.json(result);
    }
        })
}