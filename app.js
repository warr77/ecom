const express=require("express");
const res=require("./routes/posts");
const userroute=require("./routes/user");
const cate=require("./routes/cate");
const category=require("./routes/category");
const product=require("./routes/product");
const dotenv=require("dotenv");
const morgan= require("morgan");
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors=require("cors");
const expressValidator = require("express-validator");
const User = require("./routes/model/auth");
const braintreeRoutes=require("./routes/controller/BBraintree")
const orderRoutes=require("./routes/orders")
dotenv.config();
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});
const middleware=(req,res,next)=>{console.log("hello");
next();};
const app=express();
function testing(req,res,next){
 User.find().exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        res.send(user);
        next();
    });
}
//app.use(middleware);
//app.use(morgan("dev"));
app.use(cors());
//app.use(expressValidator());
app.use(bodyParser.json());
app.use("/",res);
app.use("/",userroute);
app.use("/",cate);
app.use("/",category);
app.use("/",product);
app.get("/test",testing);
app.use("/",braintreeRoutes);
app.use("/",orderRoutes);
app.use(cookieParser());


app.listen(8000);