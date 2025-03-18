import React, { useEffect, Fragment,useState } from 'react';
import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction.js';
import ReactStars from "react-rating-stars-component"
import ReviewCard from './ReviewCard.jsx';
import Loader from '../layout/Loader/Loader.jsx';
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData.jsx';
import { addItemsToCart } from '../../actions/cartAction';
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button} from '@material-ui/core'
import {Rating} from '@material-ui/lab'
import { NEW_REVIEW_RESET } from '../../constants/productConstants.js';


const ProductDetails = () => {
  const { id } = useParams(); // Use useParams to get the id from the route
  const dispatch = useDispatch();
  const alert=useAlert();

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);

  useEffect(() => {
    if(error){
     alert.error(error);
     dispatch(clearErrors());
    }
    if(reviewError){
      alert.error(reviewError);
      dispatch(clearErrors());
     }
    if(success){
      alert.success("Review submitted successfully");
      dispatch({type:NEW_REVIEW_RESET})
    }
    dispatch(getProductDetails(id));
  }, [dispatch,id,error,alert,reviewError,success]);

  const options={

    size:'large',  
    value:product.ratings,  
    readOnly:true,
    precision:0.5
  }

  const [quantity, setQuantity] = useState(1);
  const [open,setOpen]=useState(false);
  const [rating,setRating]=useState(0);
  const [comment,setComment]=useState("");
  


  const increaseQuantity = () => {
    if(quantity >= product.stock) return;
      const qty = quantity + 1;
      setQuantity(qty);
    };

  const decreaseQuantity = () => {
    if(quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty); 
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item added to cart successfully");
  };
   

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  }


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
         <MetaData title={`${product.name} -- BaggyBuy`}/>
        <div className="ProductDetails"> 
          <div className='CAROUSEL'>
            <Carousel className='Carousel'>
              {product.images &&
                product.images.map((items, i) => (
                  <img
                    src={items.url}
                    alt={`${i} Slide`}
                    className="CarouselImage"
                    key={items.url}
                  />
                ))}
            </Carousel>
          </div>
                <div>
  
                  <div className="DetailsBlock-1">
                      <h2>{product.name}</h2>
                      <p>Product#{product._id}</p>
                  </div>
  
                  <div className="DetailsBlock-2">
                      <Rating {...options}/> 
                      <span>({product.numOfReviews} Reviews)</span>
                  </div>
  
                  <div className="DetailsBlock-3">
                    <h1>{`Rs.${product.price}`}</h1>
                    <div className="DetailsBlock-3-1">
  
                      <div className="DetailsBlock-3-1-1">
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly type="number" value={quantity} />
                            <button onClick={increaseQuantity}>+</button>
                      </div>
                           
                           <button disabled={product.Stock<1 ?true:false} onClick={addToCartHandler}>Add to Cart</button>
                    </div>
  
                    <p>Status:
                      <b className={product.Stock<1 ? "redColor" : "greenColor"}>
                            {product.Stock<1 ? "Out Of Stock" : "In Stock"}
                      </b>
  
                    </p>
  
                  </div>
  
                  <div className="DetailsBlock-4">
                    Description: <p>{product.description}</p>
                  </div>
  
                    <button  onClick={submitReviewToggle} className="SubmitReview">Submit Review</button>
  
  
                </div>
  
  
  
        </div>
  
  
        <h3 className='reviewsHeading'>REVIEWS</h3>

        <Dialog  aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
          <DialogTitle >Submit Review</DialogTitle>

          <DialogContent className='submitDialog'>

          <Rating onChange={(e)=>setRating(e.target.value)}
            value={rating}
            size='large'/>
           
          <textarea 
          className='submitDialogTextArea'
          cols='30'
          rows='5'
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          
          ></textarea>

          </DialogContent>

          <DialogActions>
            <Button color='secondary' onClick={submitReviewToggle}>Cancel</Button>
            <Button color='primary' onClick={reviewSubmitHandler}>Submit</Button>
          </DialogActions>
         


        </Dialog>
  
        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </Fragment>
      )}
    </Fragment>
    
  );
};

export default ProductDetails;
