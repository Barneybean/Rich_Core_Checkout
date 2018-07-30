import React from "react";
import "./Cart.css"
import CartIcon from "../../assets/images/cart.png"

const Cart = ({cartCount}) => (

        <div>
            <a href="/cart"><img id="cart" src={CartIcon} height="40px" width="40" alt="cart"/></a>
            <a href="/cart"><p id="cartCount">({cartCount})</p></a>
        </div>
)

export default Cart;