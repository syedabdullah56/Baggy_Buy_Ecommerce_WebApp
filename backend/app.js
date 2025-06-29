const express=require("express")
const cookieParser=require("cookie-parser")
const errorMiddleware=require("./middleware/error.js")
const dotenv=require("dotenv")
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const app=express();
const path = require('path');

// Config 
dotenv.config({path:"backend/config/config.env"})
         
  

// Middleware  
app.use(express.json({ limit: "10mb" })); //  Increase JSON payload limit
app.use(cookieParser())  //this middleware is used to parse the cookie from an incoming request and make it available in req.cookies
app.use(bodyParser.urlencoded({extended:true, limit: "10mb"}))  //this middleware is used to parse the body of incoming request and make it available in req.body
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

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes with index.html (for React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error Middleware
app.use(errorMiddleware);



module.exports=app;
