const express=require("express")
const cookieParser=require("cookie-parser")
const errorMiddleware=require("./middleware/error.js")
const dotenv=require("dotenv")
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const app=express();

// Config 
dotenv.config({path:"backend/config/config.env"})


app.use(express.json())  //this middleware is used to parse the bady of incoming request and make it available in req.body
app.use(cookieParser())  //this middleware is used to parse the cookie from an incoming request and make it available in req.cookies
app.use(bodyParser.urlencoded({extended:true}))  //this middleware is used to parse the body of incoming request and make it available in req.body
app.use(fileUpload());
  
// Route Imports
const product=require("./routes/productRoute.js");
const user=require("./routes/userRoute.js");
const order=require("./routes/orderRoute.js");
const payment=require("./routes/paymentRoute.js");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

// Error Middleware
app.use(errorMiddleware);



module.exports=app;
