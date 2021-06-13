const category =require("../model/category");

exports.categorybyId=(req,res,next,id)=>{
category.findById(id).exec((err,result)=>{
    if(err){
        return res.status(400).json({error:"category not found"});
    }
   req.category=result;
})
next();
}