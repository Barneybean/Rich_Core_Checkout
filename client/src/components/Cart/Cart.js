import React from "react";
import "./Cart.css"
import CartIcon from "../../assets/images/cart.png"

const Cart = ({cartCount}) => (

        <div>
            <img id="cart" src={CartIcon} height="40px" width="40" alt="cart"/>
            <p id="cartCount">{cartCount}</p>
        </div>
)

export default Cart;