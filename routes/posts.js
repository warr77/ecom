const rc=require("./controller/routecontroller");
const express=require("express");
const router=express.Router();

const respond= (req,res)=>{
res.send("hello");
}

//console.log("total",total);
router.get("/",rc.respond);
router.post("/post",rc.createpost);
router.post("/signup",rc.signup);
router.post("/signin",rc.signin);
router.post("/signout",rc.signout);
router.get('/hello', rc.requireSignin,(req,res)=>{res.send("hello there");
});
module.exports=router;