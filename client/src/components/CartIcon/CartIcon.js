import React from "react";
import "./CartIcon.css"
import CartImage from "../../assets/images/cart.png"

const Cart = ({cartCount}) => (

        <div>
            <a href="/cart"><img id="cart" src={CartImage} height="40px" width="40" alt="cart"/></a>
            <a href="/cart"><p id="cartCount">({cartCount})</p></a>
        </div>
)

export default Cart;