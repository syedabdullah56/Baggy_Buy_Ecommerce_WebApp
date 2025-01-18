import React,{Fragment,useEffect,useRef} from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector,useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import {CardNumberElement,CardExpiryElement,CardCvcElement,useStripe,useElements} from '@stripe/react-stripe-js'
import axios from "axios"
import CreditCardIcon from '@material-ui/icons/CreditCard';
import EventIcon from '@material-ui/icons/Event';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import "./Payment.css"
import { useNavigate } from 'react-router-dom';


const Payment = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const alert=useAlert();
    const stripe=useStripe();
    const elements=useElements();
    const orderInfo=JSON.parse(sessionStorage.getItem('orderInfo'))
    const payBtn = useRef(null);

    const {shippingInfo, cartItems} = useSelector(state => state.cart);
    const {user}=useSelector(state=>state.user);

    const paymentData={
        amount:Math.round(orderInfo.totalPrice*100),
    }

    const submitHandler = async (e) => {
        e.preventDefault();
    
        payBtn.current.disabled = true;
    
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            // Send the payment request to the backend and get client_secret
            const { data } = await axios.post("/api/v1/payment/process", paymentData, config);
            console.log(data.client_secret);
            
    
            const client_secret = data.client_secret;
    
            if (!stripe || !elements) return;
    
            // Confirm card payment
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.province,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });
    
            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    navigate("/success");
                } else {
                    alert.error("There's some issue while processing the payment.");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };
    



  return (
     <Fragment>
        <MetaData title={"Payment"}/>
        <CheckoutSteps activeStep={2}/>

        <div className="paymentContainer">
             <form  className="paymentForm"  onSubmit={(e)=>submitHandler(e)}>
                <Typography>Card Info</Typography>
                <div>       
                    <CreditCardIcon/>         
                    <CardNumberElement className='paymentInput'/>
                </div>

                <div>
                    <EventIcon/>
                    <CardExpiryElement className='paymentInput' />
                </div>

                <div>
                    <VpnKeyIcon/>
                    <CardCvcElement className='paymentInput' />
                </div>

                <input type="submit" value={`Pay -${orderInfo && orderInfo.totalPrice} Rs`} 
                ref={payBtn}
                className='paymentFormBtn'/>


   
             </form>
            
        </div>
     </Fragment>
  )
}

export default Payment


