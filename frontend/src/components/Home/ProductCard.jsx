import React from 'react'
import {Link} from "react-router-dom"
import {Rating} from '@material-ui/lab'


const ProductCard = ({product}) => { 
  const options={   
    value:product.ratings,  
    readOnly:true,
    precision:0.5,
    size:"large"
  }
  return (
    <Link  className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options}/> <span>({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`Rs.${product.price}`}</span>
    </Link>
  )
}

export default ProductCard
