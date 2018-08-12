import React from "react";
import "./CartIcon.css"
import CartImage from "../../assets/images/cart.png"

const Cart = ({cartCount}) => (

        <div id="carContainer">
            <div className="row">
                <a href="/cart"><img id="cart" src={CartImage} height="20px" width="20px" alt="cart"/></a>
                <a href="/cart"><span id="count">({cartCount})</span></a>
            </div>
        </div>
)

export default Cart;