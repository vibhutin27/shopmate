import { useEffect, useState } from "react";
import {useCart} from "../context/CartContext";
import "./ProductCard.css";

export const ProductCard = ({product}) => {
  const {addToCart, cartList, removeFromCart} = useCart();
  const {id, name, price, image} = product;
  const [showremoveFromCart, setShowremoveFromCart] = useState(false)

  useEffect(() => {
    const itemFound = cartList.find((item) => item.id === id);
    if (itemFound) {
      setShowremoveFromCart(true);
    } else {
      setShowremoveFromCart(false);
    }


  }, [cartList, id]);
 

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        {showremoveFromCart ? (<button onClick={() => removeFromCart(product)} className="remove">Remove</button>) : (<button onClick={() => addToCart(product)}>Add To Cart</button>)}
        
      </div>
    </div>
  )
}
