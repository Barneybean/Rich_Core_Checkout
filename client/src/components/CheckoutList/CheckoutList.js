import React from "react"
import "./CheckoutList.css"
import DelBtn from "../DelBtn"

const CheckoutList = (props)=> {
    const {courseCode, courseImage, name, tokenValue, deleteItemInCart} = props
    // console.log(courseCode)
    return (
        <div className="row itemInCart">
            <div className=" itemInCart">
                <img src={courseImage} alt={name}/>
            </div> 
            <div className="content ">
                <h5>{name}</h5>
                <DelBtn 
                    onClick={()=>{deleteItemInCart(courseCode)}}
                />
                <br/>
                <h6 id="token">{tokenValue} ClaudeCoins</h6>
            </div>
        </div>
    )
}

export default  CheckoutList;