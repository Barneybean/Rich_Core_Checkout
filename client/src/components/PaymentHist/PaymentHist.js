import React from "react"
import "./PaymentHist.css"


const PaymentHist = (props) => {
    return (
        <div> 
            <div className="courseDetail">
                <ul>
                    <li><span>Ref # </span></li>
                    <li><span>Coin: </span></li>
                    <li><span>Amount: </span></li>
                    <li><span>Email: </span></li>
                    <li><span>Name: </span></li>
                    <li><span>Time: </span></li>
                    <li><span>Courses Id:</span></li>
                </ul>
            </div>
        </div>
    )
}

export default PaymentHist