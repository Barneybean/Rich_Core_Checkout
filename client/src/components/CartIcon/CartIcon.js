import React from "react";
import "./CartIcon.css"
import CartImage from "../../assets/images/cart.png"

const Cart = ({cartCount}) => (

        <div id="carContainer">
            <a href="/cart"><img id="cart" src={CartImage} height="30px" width="30" alt="cart"/></a>
            <a href="/cart"><p id="cartCount">({cartCount})</p></a>
        </div>
)

export default Cart;