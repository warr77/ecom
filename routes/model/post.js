const mongoose=require("mongoose");
const uuid=require("uuid/v1");
const crypto=require("crypto");
const schema=mongoose.Schema({
	name:{
	type:String,
	required:true,
	minlength:4,
	maxlength:50
	},
	email:{
	type:String,
	required:true,
	unique: true,
	minlength:4,
	maxlength:50
	},
salt:{
	type:String
},
hpassword:{
type:String
},
});
schema.virtual("password").set(function(password){
	this.salt=uuid();
	this.hpassword=this.ePassword(password);
}).get(function(){
	//return this.salt;
});
schema.methods={

	authenticate: function(plainText){
		return this.ePassword(plainText)===this.hashed_password;
	},

ePassword: function(password){
		if(!password)return"";
		try{
			return crypto
			.createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
	}
};
module.exports=mongoose.model("post",schema);

