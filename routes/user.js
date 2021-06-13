const express = require("express");
const router = express.Router();
//const userById =require("./controller/user");
const {requireSignin,isAdmin,isAuth} =require("./controller/routecontroller");


router.get("/secret/:userId",requireSignin,isAuth,isAdmin,(req,res)=>{

	res.json({
		user:req.profile
	});
});


const User = require("./model/auth");
const { Order } = require("./model/order");

const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};


let  read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

let purchaseHistory =(req,res)=>{
    Order.find({user:req.profile._id})
    .populate('users',"_id name")
    .sort("-created")
    .exec((error,orders)=>{
        if(error){
            console.log("error"+error)
            res.status(400).json({
                error:"could not get user order history"
            })
        }
        res.json(orders)
    })
}



const update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};



router.get("/user/:userId", requireSignin,isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.get("/order/by/user/:userId", requireSignin,isAuth, purchaseHistory);

router.param("userId",userById);
module.exports=router;