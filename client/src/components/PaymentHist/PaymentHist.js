import React from "react"
import "./PaymentHist.css"


const PaymentHist = ({refNo, coin, amount, email, firstName, lastName, time, courseCodes, courseNames, num}) => {
    let courseCodeList = courseCodes.map(item=>(item+"; "))
    let courseNameList = courseNames.map(item=>(item+"; "))
    
    return (
        <div> 
            <div className="paymentDetail">
                <ul>
                    <li><span>Payment {num}</span></li>
                    <li><span>Ref # {refNo}</span></li>
                    <li><span>Coin: {coin}</span></li>
                    <li><span>Amount: {amount}</span></li>
                    <li><span>Email: {email}</span></li>
                    <li><span>Name: {firstName} {lastName}</span></li>
                    <li><span>Time: {time}</span></li>
                    <li><span>Courses Codes: {courseCodeList}</span></li>
                    <li><span>Courses Name: {courseNameList}</span></li>
                </ul>
            </div>
        </div>
    )
    
}

export default PaymentHist