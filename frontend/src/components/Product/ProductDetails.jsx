import React, { useEffect, Fragment,useState } from 'react';
import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams
import { clearErrors, getProductDetails } from '../../actions/productAction.js';
import ReactStars from "react-rating-stars-component"
import ReviewCard from './ReviewCard.jsx';
import Loader from '../layout/Loader/Loader.jsx';
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData.jsx';
import { addItemsToCart } from '../../actions/cartAction';


const ProductDetails = () => {
  const { id } = useParams(); // Use useParams to get the id from the route
  const dispatch = useDispatch();
  const alert=useAlert();

  const { product, loading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    if(error){
     alert.error(error);
     dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch,id,error,alert]);

  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth <600 ? 20: 25,  
    value:product.ratings,  
    isHalf:true,
  }

  const [quantity, setQuantity] = useState(1);

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
                      <ReactStars {...options}/>
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
                           
                           <button onClick={addToCartHandler}>Add to Cart</button>
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
  
                    <button className="SubmitReview">Submit Review</button>
  
  
                </div>
  
  
  
        </div>
  
  
        <h3 className='reviewsHeading'>REVIEWS</h3>
  
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
