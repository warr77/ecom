const mongoose=require("mongoose");

const categorysch= new mongoose.Schema({
	name:{
	type:String,
	trim:true,
	required:true,
	minlength:4,
	maxlength:50,
	unique:true
	},
	
},{timestamps:true});

module.exports=mongoose.model("category",categorysch);