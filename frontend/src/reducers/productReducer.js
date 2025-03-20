import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL,NEW_REVIEW_REQUEST,NEW_REVIEW_SUCCESS,NEW_REVIEW_RESET,NEW_REVIEW_FAIL,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_FAIL } from "../constants/productConstants.js";
const initialState = {
    products: []
}; 
export const productReducer = (state=initialState, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],  
            }; 
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                };
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state; 
    }
};


export const productDetailsReducer = (state={product:{}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product:action.payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// New Review Reducer
export const newReviewReducer = (state={}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success:action.payload,
            };
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_REVIEW_FAIL:
            return {
                ...state, 
                success: false,
                };


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
