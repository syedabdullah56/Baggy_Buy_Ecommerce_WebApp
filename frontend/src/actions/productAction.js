import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST, 
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,NEW_REVIEW_SUCCESS,NEW_REVIEW_RESET,NEW_REVIEW_FAIL,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_FAIL
} from "../constants/productConstants.js";

export const getProduct = (keyword="",currentPage=1,price=[0,50000],category,ratings=0) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });
    let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if(category){
      link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    }
    const { data } = await axios.get(link);   
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: errorMessage,
    });
  }   
};

// GET ALL PRODUCTS FOR ADMIN
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PRODUCT_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/admin/products`);   
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload:error.response.data.message,  
    });
  }        
}   








export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:errorMessage,
    });
  }
}; 

// New Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      }, 
    }

    const { data } = await axios.put(`/api/v1/review`, reviewData,config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload:errorMessage,
    });
  }
}; 

// Clearing Errors
export const clearErrors=()=>async (dispatch)=>{
  dispatch({type:CLEAR_ERRORS})

}
