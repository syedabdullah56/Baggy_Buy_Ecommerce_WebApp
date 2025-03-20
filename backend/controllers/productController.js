const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsynErrors=require("../middleware/catchAsyncError.js")
const ApiFeatures=require("../utils/apiFeatures.js")
const User=require("../models/userModel.js")
    
// Create Product--Admin
exports.createProduct = catchAsynErrors(async (req, res, next) => {

    // To get the name and id of user who created the product,extra functionality
    req.body.user = req.user.id;
    const user = await User.findById(req.user.id);
    req.body.createdBy = user.name; // Assuming the user model has a 'name' field


    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

// Get All Products
exports.getAllProducts = catchAsynErrors(async (req, res,next) => {
    const resultPerPage=8;
    const productsCount=await Product.countDocuments();
    
    const apiFeatures=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    
   
    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        productsCount,   
        products,
        resultPerPage,
        });
});


// Get All Products--Admin
exports.getAdminProducts = catchAsynErrors(async (req, res,next) => {

    const products=await Product.find();
  
    res.status(200).json({
        success: true,
        products
    
        });
});

// Update Product
exports.updateProduct = catchAsynErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        product,
    });
});

// Delete A Product
exports.deleteProduct = catchAsynErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });
     })

// Get product details
exports.getProductDetails=catchAsynErrors(async (req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
       return next(new ErrorHandler("Product not found",404))
    }
 
 
    res.status(200).json({
       success:true,
       product,
    })
 }) 

 //Create A New or Update The Review
 exports.createProductReview=catchAsynErrors(async(req,res,next)=>{
    const {rating,comment,productId}=req.body;
    const review={ 
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product=await Product.findById(productId);
    const isReviewed=await product.reviews.find(rev=>rev.user===req.user._id);

    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user===req.user._id){
                rev.rating=rating;
                rev.comment=comment;
            }
        });
    }else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }
    let avg=0;
    product.ratings=product.reviews.reduce((acc,curr)=>{
        return acc+curr.rating
    },0)
    // console.log(product.ratings);
    avg=product.ratings/product.reviews.length;
    product.ratings=avg;

    await product.save({validateBeforeSave:false})


    res.status(200).json({
        success:true,
    })
 })

//  Get All Reviews Of A Single Product
exports.getAllReviews=catchAsynErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
      }

    res.status(200).json({
        success:true,
        reviews:product.reviews,

    })
})

//Delete reviews
exports.deleteReviews=catchAsynErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    const reviews=product.reviews.filter((rev)=>rev._id.toString() !== req.query.id.toString());

    let avg=0;
    reviews.forEach(rev=>{
       avg=avg+rev.rating;
    })
 
    const ratings=avg/reviews.length;

    const numOfReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
      })

      res.status(200).json({
        success:true,
        reviews:product.reviews,
     })



})

