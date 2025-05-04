import React,{Fragment,useEffect,useState} from 'react'
import './newProduct.css'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import {Button} from '@material-ui/core'
import MetaData from '../layout/MetaData';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
const NewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, success } = useSelector((state) => state.newProduct);
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
  
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    useEffect(() => {
       if(error){
        alert.error(error);
        dispatch(clearErrors());
       }
       if(success){
        alert.success("Product Created Successfully");
        navigate("/admin/dashboard");
        dispatch({type:NEW_PRODUCT_RESET});
       }
    }, [dispatch,alert,error,success,navigate]);

    const createProductSubmitHandler=(e)=>{
        e.preventDefault()
        // will make this function in the future
    }
    

  return (
    <Fragment>
       <MetaData title="Create Product" />  

       <div className="dashboard">
         <SideBar />
         <div className="newProductContainer">

            <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={createProductSubmitHandler}>

            <h1>Create Product</h1>

            <div>
                <SpellcheckIcon />
                <input
                type='text'
                placeholder='Product Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>

            <div>
                <AttachMoneyIcon />
                <input
                type='number'
                placeholder='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                />
            </div>

            <div>
                <DescriptionIcon />
                <textarea
                placeholder='Product Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
                required
                />
            </div>

            <div>
                <AccountTreeIcon />
                <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                    <option key={cate} value={cate}>
                    {cate}
                    </option>
                ))}
                </select>
            </div>

            <div>
                <StorageIcon />
                <input
                type='number'
                placeholder='Stock'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                />
            </div>

            <div id='createProductFormFile'>
                <input
                type='file'
                name='avatar'
                accept='image/*'
                // onChange={createProductImagesChange}
                // multiple
                />
            </div>

            <div className="createProductFormImage">
                {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
                ))}
            </div>

            <Button
                id='createProductBtn'
                type='submit'
                disabled={loading ? true : false}
            >
                Create
            </Button>
            

            </form>
         </div>


       </div>
    </Fragment>
  )
}

export default NewProduct
