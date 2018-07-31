import React from "react";

export const PlainInput = props => (
  <div className="form-group pt-5">
    <label className="label-float" style={{color: "black", fontSize: "1em"}}>{props.label}</label>
    <input className="form-control" {...props}/>
  </div>
);
