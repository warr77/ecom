
const Post=require("../model/post")
const user=require("../model/auth")
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt"); 
require("dotenv").config();
exports.respond= (req,res)=>{
	res.json({ post:[{title:"first post"},{title:"second post"}]

	});
};

exports.createpost=(req,res)=>{
	//res.send("hello");
	const post= new Post(req.body);
//console.log("creatingpost",post);
	post.save((err,result)=>{
		if (err){
			return res.status(400).json({error:err});
		}
		 res.status(200).json({post:result});
	});
	
};

exports.signup=(req,res)=>{
	//res.send("hello");
	const User= new user(req.body);
//console.log("creatingpost",User);
	User.save((err,result)=>{
		if (err){
			return res.status(400).json({error:err});
		}
		 res.status(200).json({post:result});
	});
	
};
exports.signin=(req,res)=>{
	//res.send("hello");
	const {email,password}=req.body;
	user.findOne({email},(err,fuser)=>

		{
if(err||!fuser){
	return res.status(400).json({
                error: "User with that email does not exist. Please signup"
            });
	// create authenticate method in user model
       
}else  if (!fuser.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password dont match"
            });}

else{
const token =jwt.sign({_id:fuser._id},process.env.secret);
res.cookie("t", token, { expire: new Date() + 9999 });
  const { _id, name, email, role } = fuser;
        return res.json({ token, user: { _id, email, name, role } });

}		

});

	
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Signout success" });
    console.log( "Signout success")
};


exports.requireSignin = expressJwt({
    secret: process.env.secret,
    algorithms: ["HS256"],
    userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
   

    if (!user) {
        
        return res.status(403).json({
            error: "Access denied not a user",
            user: user
        });
    }
    //console.log(user);
    //console.log(req.profile);
       // console.log(req.auth);
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resourse! Access denied"
        });
    }
    next();
};

//module.exports=respond;
//module.exports={sum};
//console.log("process",process)