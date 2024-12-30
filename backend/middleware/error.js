const ErrorHandler=require("../utils/errorHandler.js");
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";


// Wrong Mongodb ID error or CastError
if(err.name==="CastError"){
    const message=`Resource not found. Invalid :${err.path}`;
    err=new ErrorHandler(message,400)
}

// Mongoose duplicate key Error
if(err.code===11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
    err=new ErrorHandler(message,400);
}

// Wrong JWT key Error
if(err.name==="JsonWebTokenError"){
    const message=`Json Web Token is Invalid Try Again`;
    err=new ErrorHandler(message,400);
}

// Wrong JWT key Error
if(err.name==="TokenExpiredError"){
    const message=`Json Web Token is Expired Try Again`;
    err=new ErrorHandler(message,400);
}


    res.status(err.statusCode).json({
        success:false,
        message:err.message,

    })
}

