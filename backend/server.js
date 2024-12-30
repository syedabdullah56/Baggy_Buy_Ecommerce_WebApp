const app=require("./app")
const dotenv=require("dotenv")
const cloudinary=require("cloudinary")
const connectDatabase = require("./config/database")


// Config 
dotenv.config({path:"backend/config/config.env"})

// Connecting Database
connectDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

       
// Starting the server
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);

})

// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    server.close(()=>{
        process.exit(1)
    })
})



// Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    server.close(()=>{
        process.exit(1)
    })
})