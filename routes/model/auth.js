const mongoose=require("mongoose");
const uuid=require("uuid/v1");

const crypto=require("crypto");
const user=mongoose.Schema({
	name:{
	type:String,
	required:true,
	minlength:4,
	maxlength:50
	},
	email:{
	type:String,
	required:true,
	unique:true
	},
	hashed_password:{
	type:String
},
role:{
	type:Number,
	default:0
},
salt:{
	type:String
},
history:{
	type:Array,
	default:[]
},
});
user.virtual("password")
.set(function(password){
this._password=password;
this.salt=uuid();
this.hashed_password=this.encrPass(password);

})
.get(function(){
return this._password ;});

user.methods={
	 authenticate: function(plainText) {
        return this.encrPass(plainText) === this.hashed_password;
    },
encrPass: function(password){
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
module.exports=mongoose.model("users",user);