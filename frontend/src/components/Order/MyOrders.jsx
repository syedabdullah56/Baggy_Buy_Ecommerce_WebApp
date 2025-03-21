import React,{useEffect,Fragment} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./MyOrders.css";
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import LaunchIcon from '@mui/icons-material/Launch'; 

const MyOrders = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const alert=useAlert();
    const {loading,error,orders}=useSelector(state=>state.myOrders);
    const {user}=useSelector(state=>state.user);

    const columns=[
        {field:"id",headerName:"Order ID",minWidth:300,flex:1},
        {field:"status",headerName:"Status",minWidth:150,flex:0.5,cellClassName:(params)=>{
            return params.row.status==="Delivered" ? "greenColor" : "redColor";
        }},
        {field:"itemsQty",headerName:"Quantity",type:"number",minWidth:150,flex:0.3},
        {field:"amount",headerName:"Amount",type:"number",minWidth:270,flex:0.5},
        {field:"actions",flex:0.3,headerName:"Actions",minWidth:150,type:"number",sortable:false,renderCell:(params)=>{
            return(
                <Link to={`/order/${params.row.id}`}>
                <LaunchIcon />
               </Link>
            )
        }}
    ];

    const rows=[]; 

    orders && orders.forEach(order=>{
        rows.push({
            id:order._id,
            itemsQty:order.orderItems.length,
            amount:order.totalPrice,
            status:order.orderStatus,
        })
    })
    
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    },[dispatch,alert,error]);
  
  return (
    <Fragment>
        <MetaData title={`${user.name} -Orders`} />
        {loading ? <Loader/> :(
            <div className="myOrdersPage">
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight
                />
                <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
            </div>
        )}
    </Fragment>
  )
}

export default MyOrders
