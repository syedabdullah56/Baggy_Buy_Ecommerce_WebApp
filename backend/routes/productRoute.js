const express=require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReviews, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router=express.Router();
     
 
//Get All Products
router.route("/products").get(getAllProducts);


//Get All Products--Admin
router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);
 
// Create Product
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

// Update Product
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);

// Delete Product
router.route("/admin/product/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

// Get Product Details
router.route("/product/:id").get(getProductDetails);

// Create Or Update A review
router.route("/review").put(isAuthenticatedUser,createProductReview);

// Get All Reviews Of A Single Product
router.route("/reviews").get(getAllReviews);

// Delete Reviews
router.route("/reviews").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteReviews);











module.exports=router;
