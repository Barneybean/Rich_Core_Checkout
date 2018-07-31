import React from "react"
import "./CheckoutList.css"
import DelBtn from "../DelBtn"

const CheckoutList = (props)=> {
    const {courseCode, courseImage, name, tokenValue, deleteItemInCart} = props
    // console.log(courseCode)
    return (
        <div className="itemInCart">
            <img src={courseImage} alt={name}/>
            <h5>{name}</h5>
            <DelBtn 
                onClick={()=>{deleteItemInCart(courseCode)}}
            />
            <br/><br/>
            <h6 id="token">{tokenValue} ClaudeCoins</h6>
        </div>
    )
}

export default  CheckoutList;