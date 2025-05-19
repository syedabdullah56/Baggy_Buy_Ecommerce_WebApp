import React,{Fragment,useEffect,useState} from 'react'
import './newProduct.css'
import { useSelector,useDispatch} from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import {Button} from '@material-ui/core' 
import MetaData from '../layout/MetaData';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { set } from 'mongoose';
const UpdateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const params=useParams();

    const {error,product} = useSelector((state) => state.productDetails);
    const { loading, error:updateError, isUpdated } = useSelector((state) => state.Product);
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
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

    const productId=params.id;

    useEffect(() => {
       if(product && product._id !== productId){
        dispatch(getProductDetails(productId));
       }else{
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setStock(product.stock);
        setOldImages(product.images);
       }
       if(updateError){
        alert.error(updateError);
        dispatch(clearErrors());
       }
       if(isUpdated){
        alert.success("Product Updated Successfully");
        navigate("/admin/products");
        dispatch({type:UPDATE_PRODUCT_RESET});
       }
    }, [dispatch,alert,navigate,isUpdated,updateError,,product,productId]);

    const updateProductSubmitHandler=(e)=>{
        e.preventDefault()

        const myForm=new FormData();
        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("description",description);
        myForm.set("category",category);
        myForm.set("stock",stock);
        images.forEach((image)=>{
            myForm.append("images",image);
        });
        dispatch(updateProduct(productId,myForm));
    }

    const updateProductImagesChange=(e)=>{
        const files=Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
        files.forEach((file)=>{
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setImagesPreview((oldArray)=>[...oldArray,reader.result]);
                    setImages((oldArray)=>[...oldArray,reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
       
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
            onSubmit={updateProductSubmitHandler}>

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
                <select onChange={(e) => setCategory(e.target.value)} value={category}>
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
                onChange={updateProductImagesChange}
                multiple
                /> 
            </div>

            <div className="createProductFormImage">
                {oldImages && oldImages.map((image, index) => (
                <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
                Update
            </Button>
            

            </form>
         </div>


       </div>
    </Fragment>
  )
}

export default UpdateProduct

