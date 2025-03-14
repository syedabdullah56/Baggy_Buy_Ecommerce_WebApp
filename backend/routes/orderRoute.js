const express=require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { createNewOrder, getSingleOrderDetails, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const router=express.Router();

// Create New Order
router.route("/order/new").post(isAuthenticatedUser,createNewOrder)

// Get Single Order Details
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrderDetails);
 
// My Orders/Logged In User Orders
router.route("/orders/me").get(isAuthenticatedUser,myOrders);

// Get All Orders Admin
router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

//Update Order Status---Admin
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrderStatus);

// Delete Order ---Admin
router.route("/admin/order/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);









module.exports=router;