import React from "react";
import "./Alert.css"

const Alert = ({notice}) => (

    <div className="alert alert-danger" role="alert">
        {notice}
    </div>
)

export default Alert;