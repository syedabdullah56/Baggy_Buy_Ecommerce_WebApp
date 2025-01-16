const express=require('express');
const router=express.Router();
const {isAuthenticatedUser}=require("../middleware/auth.js");
const {processPayment,sendStripeApiKey}=require("../controllers/paymentController.js");

router.route("/process/payment").post(isAuthenticatedUser,processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser,sendStripeApiKey);

module.exports=router;   