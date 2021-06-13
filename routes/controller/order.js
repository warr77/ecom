const{Order,CartItem}= require("../model/order")

exports.orderById=(req,res,next,id)=>{
    Order.findById(id).populate('products.product','name price').
    exec(( err,order)=>{
        if(err||!order){
            return res.status(400).json({error:"could not find order"})
        }
        req.order=order;
        next();
    }
        )
}

exports.create=(req,res)=>{
//console.log("create order",req.body)
req.body.order.user=req.profile
const order=new Order(req.body.order)
order.save((error,data)=>{
    if(error){
        return res.status(400).json({error:"could not saveorders"})
    }
    console.log(data);
    return
})
}

exports.listOrders=(req,res)=>{
    Order.find().populate('users',"_id name address")
    .sort('-created').exec((err,orders)=>{
        //console.log(err);
        if(err){return res.status(400).json({error:"somthing went wrong"})}
        res.json(orders)
    })

}
exports.getStatusValues =(req,res)=>{
  //console.log(Order.schema.path("status").enumValues); 
   res.json(Order.schema.path("status").enumValues)
    
}

exports.updateOrderStatus=(req,res)=>{
    Order.update({_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err){
            return res.status(400).json({error:"could not update order"})
            }
            
            res.json(order);
        })
}