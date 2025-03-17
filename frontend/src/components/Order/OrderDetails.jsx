import React,{Fragment,useEffect} from 'react'
import "./OrderDetails.css";
import { useSelector,useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { clearErrors,getOrderDetails } from '../../actions/orderAction';
import { use } from 'react';

const OrderDetails = () => {
    const {order,error,loading}=useSelector(state=>state.orderDetails);
    const dispatch=useDispatch();
    const alert=useAlert();
    const params=useParams();

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(params.id));
    },[dispatch,error,alert,params.id]);
  return (
      <Fragment>
          {loading?<Loader/>:(
            <Fragment>
                <MetaData title="Order Details"/>
             
            </Fragment>
          )}
                
      </Fragment>
  )
}

export default OrderDetails
