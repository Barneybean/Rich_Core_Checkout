import React from "react";
import "./DelBtn.css"

const DelBtn = (props) => (

    <span 
        id="delBtn"
        className="delete-btn mr-2" 
        style={{ float: "left", color: "rgb(4, 48, 119)", cursor: "pointer", textDecoration: "underline"}}
        {...props}
    > 
    Remove
    </span>
)

export default DelBtn;