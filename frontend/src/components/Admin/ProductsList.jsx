import React,{Fragment,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import './productList.css'
import {useSelector,useDispatch} from 'react-redux'
import { clearErrors, getAdminProducts } from '../../actions/productAction';
import {Link} from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Sidebar from './Sidebar.jsx';
   
const ProductsList = () => {     
    const dispatch=useDispatch();
    const alert=useAlert();
    const {error,loading,products}=useSelector((state)=>state.adminProducts)

       


     console.log(products);
     

    const columns=[
        {field:"id",headerName:"Product ID",minWidth:200,flex:0.5},
        {field:"name",headerName:"Name",minWidth:350,flex:1},
        {field:"stock",headerName:"Stock",type:"number",minWidth:150,flex:0.3},
        {field:"price",headerName:"Price",type:"number",minWidth:270,flex:0.5},
        {field:"actions",flex:0.3,headerName:"Actions",minWidth:150,type:"number",sortable:false,renderCell:(params)=>{
            return(
                <Fragment>
                    <Link to={`/admin/product/${params.row.id}`}><EditIcon /></Link>
                    <Button ><DeleteIcon /></Button>
                </Fragment>

            )     
        }}
    ]    
    

    const rows=[];

    products && products.forEach(product=>{ 
        rows.push({id:product._id,name:product.name,stock:product.stock,price:product.price}) 
    })


    
    useEffect(() => {
        if(error){   
            alert.error(error);
            dispatch(clearErrors());  
           }
        dispatch(getAdminProducts());  
    }, [dispatch,error,alert]);
        
  
      
  return (
    <Fragment>
        {loading ? <Loader/> :  (
            <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>
                   
                    
                    <DataGrid  columns={columns} rows={rows} pageSize={10} disableSelectionOnClick  className="productListTable" autoHeight/>
                </div>
            </div>
           
        </Fragment>  
        )  }  
    </Fragment>  
  )
}

export default ProductsList
