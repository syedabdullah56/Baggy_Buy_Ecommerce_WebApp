import React,{Fragment,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import './productList.css'
import {useSelector,useDispatch} from 'react-redux'
import { clearErrors, getAdminProducts,deleteProduct } from '../../actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import {Link} from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'; 
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Sidebar from './Sidebar.jsx';
import { deleteOrder, getAllOrders } from '../../actions/orderAction.js';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants.js';
import { itIT } from '@mui/material/locale';
   
const OrderList = () => {     
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const alert=useAlert();
    const {error,orders}=useSelector((state)=>state.allOrders)
    const {error:deleteError,isDeleted,loading}=useSelector((state)=>state.order)
    
       
    const deleteOrderHandler=(id)=>{
        dispatch(deleteOrder(id));
    }

     

    useEffect(() => {
        if(error){   
            alert.error(error);
            dispatch(clearErrors());  
        }

        if(deleteError){   
            alert.error(deleteError);
            dispatch(clearErrors());  
        }

        if(isDeleted){
            alert.success("Order Deleted Successfully");
            dispatch({type:DELETE_ORDER_RESET});
            navigate("/admin/dashboard");
        }

        dispatch(getAllOrders());  
    }, [dispatch,error,alert,deleteError,navigate,isDeleted]);
    
    const columns=[ 
      {field:"id",headerName:"Order ID",minWidth:300,flex:1},
      {field:"status",headerName:"Status",minWidth:150,flex:0.5,cellClassName:(params)=>{
          return params.row.status==="Delivered" ? "greenColor" : "redColor";
      }},
      {field:"itemsQty",headerName:"Quantity",type:"number",minWidth:150,flex:0.3},
      {field:"amount",headerName:"Amount",type:"number",minWidth:270,flex:0.5},
        {field:"actions",flex:0.3,headerName:"Actions",minWidth:150,type:"number",sortable:false,renderCell:(params)=>{
            return(
                <Fragment>
                    <Link to={`/admin/order/${params.row.id}`}><EditIcon /></Link>
                    <Button onClick={()=>deleteOrderHandler(params.row.id)}><DeleteIcon /></Button>
                </Fragment>

            )     
        }}
    ]    
    

    const rows=[];

    orders && orders.forEach(order=>{ 
        rows.push({id:order._id,itemsQty:order.orderItems.length,amount:order.totalPrice,status:order.orderStatus}) 
    })


    
    useEffect(() => {
        if(error){   
            alert.error(error);
            dispatch(clearErrors());  
           }
     //Delete Error
        if(deleteError){   
            alert.error(deleteError);
            dispatch(clearErrors());  
           }
              //Checking Product is deleted or not
        if(isDeleted){
            alert.success("Order Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({type:DELETE_ORDER_RESET});
        }
        // dispatching to get all orders for admin
        dispatch(getAllOrders());  
    }, [dispatch,error,alert,deleteError,navigate,isDeleted]);
        
  
       
  return (
    <Fragment>
        {loading ? <Loader/> :  (
            <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />
            <div className="dashboard">
                <Sidebar />    
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>
                   
                    
                    <DataGrid  columns={columns} rows={rows} pageSize={100} disableSelectionOnClick  className="productListTable" autoHeight/>
                </div>
            </div>
           
        </Fragment>  
        )  }  
    </Fragment>  
  )
}

export default OrderList

 