const User = require("../model/auth");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
       // console.log(req.profile);
        next();
    });
};

exports.order2userhistory=(req,res,next)=>{
    let history=[]
    req.body.order.products.forEach((item)=>{history.push({_id:item._id,
    name:item.name,
    description:item.description,
    category:item.category,
    quantity:item.count,
    transaction_id:req.body.order.transaction_Id,
    amount:req.body.order.amount
    })
})
User.findOneAndUpdate({_id:req.profile._id},{$push:{history:history}},{new :true},(error,data)=>{
    
    if(error){
return res.status(400).json({error:"Could not update user purchase history"})
    }
    next();
})
}