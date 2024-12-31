import React,{Fragment} from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard.jsx'
import {useSelector,useDispatch} from 'react-redux'
import {addItemsToCart,removeItemsFromCart} from '../../actions/cartAction'
import {Link} from 'react-router-dom'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {cartItems}=useSelector(state=>state.cart)

    const increaseQuantity=(id,quantity,stock)=>{ 
        const newQty=quantity+1;
        if(stock<=quantity){
            return;
        }
        dispatch(addItemsToCart(id,newQty));
    }

    const decreaseQuantity=(id,quantity)=>{
        const newQty=quantity-1;
        if(quantity<=1){
            return;
        }
        dispatch(addItemsToCart(id,newQty));
    }

    const deleteCartItems=(id)=>{
        dispatch(removeItemsFromCart(id));
    }

    const CheckoutHandler=()=>{
        navigate("/login?redirect=shipping")  //Navigate To Login Or Shipping Page
    }

  return (
    <Fragment>
        {cartItems.length===0 ? 
         <div className="emptyCart">
            <RemoveShoppingCartIcon style={{fontSize:'100px'}}/>
            <Typography>Your Cart is Empty</Typography>
            <Link to="/products">View Products</Link>
         </div>

         : (
             <Fragment>
             <div className="cartPage">
     
                 <div className="cartHeader">
                     <p>Product</p>
                     <p>Quantity</p>
                     <p>Subtotal</p>
                 </div>
     
                {cartItems && cartItems.map((item)=>{
                        return    <div className="cartContainer" key={item.product}>
                            <CartItemCard item={item}  deleteCartItems={deleteCartItems}/>
            
                            <div className="cartInput">
                                <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                                <input type="number" readOnly value={item.quantity} />
                                <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                            </div>
            
                            <p className='cartSubtotal'>{`Rs.${item.price * item.quantity}`}</p>
            
                        </div>
                })}
     
                 <div className="cartGrossTotal">
     
                     <div></div>
     
                     <div className="cartGrossTotalBox">
                         <p>Gross Total</p>
                         <p>{`Rs.${cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)}`}</p>
                     </div>
     
                     <div></div>
     
                     <div className="checkOutButton">
                         <button onClick={CheckoutHandler}>Checkout</button>
                     </div>
     
     
     
                 </div>
     
             </div>
          </Fragment>
        )}
    </Fragment>
  )
}

export default Cart
