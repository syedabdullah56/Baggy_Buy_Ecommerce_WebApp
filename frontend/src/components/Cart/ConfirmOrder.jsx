import React,{Fragment} from 'react'
import "./ConfirmOrder.css"
import CheckoutSteps from './CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction'
import MetaData from '../layout/MetaData'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@material-ui/core';

const ConfirmOrder = () => {
    const { shippingInfo,cartItems } = useSelector((state) => state.cart);
    const {user}=useSelector((state)=>state.user);
    const navigate=useNavigate();
    const alert=useAlert();
    const dispatch=useDispatch();
    const address=`${shippingInfo.address},${shippingInfo.city},${shippingInfo.province},${shippingInfo.country}`;
    const subtotal=cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0);
    const shippingCharges=subtotal>1000?0:200;   //Can be changed in future
    const tax=subtotal*0;   ///Can be changed to * by percentage of tax in future
    const totalPrice=subtotal+shippingCharges+tax;

  return (
    <Fragment>
        <MetaData title={'Confirm Order'}/>
        <CheckoutSteps activeStep={1}/>

        <div className="confirmOrderPage">

            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmShippingAreaBox">
                        <div>
                            <p>Name:</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{address}</span>
                        </div>
                        <div>
                        <p>Postal Code:</p>
                        <span>{shippingInfo.pinCode}</span>
                        </div>
                    </div>

                    <div className="confirmCartItems">
                        <Typography>Cart Items</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems.map(item=>(
                                <div key={item.product}>
                                    <img src={item.image} alt={item.name}/>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    <span>
                                        {item.quantity} x Rs.{item.price}=
                                        <b>Rs.{item.price*item.quantity}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            {/*  */}
            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>Rs.{subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>Rs.{shippingCharges}</span>
                        </div>

                        <div>
                            <p>GST</p>
                            <span>Rs.{tax}</span>
                        </div>


                    </div>
                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>Rs.{totalPrice}</span>
                    </div>

                   <button>Proceed To Payment</button>


                </div>


            </div>
        </div>
    </Fragment>
  )
}

export default ConfirmOrder
