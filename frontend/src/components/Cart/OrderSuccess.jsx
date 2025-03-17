import React from 'react'
import './OrderSuccess.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const OrderSuccess = () => {
  return (
     <div className="orderSuccess">
        <CheckCircleIcon/>
        <Typography>Your Order Has Been Placed Successfully</Typography>
        <Link to="/orders">View Orders</Link>
     </div>
  )
}

export default OrderSuccess
