import React from "react";

export const PlainInput = props => (
  <div className="form-group pt-2">
    <label className="label-float" style={{color: "black", fontSize: "1em"}}>{props.label}</label>
    <br/>
    <input className="form-control mt-1" {...props}/>
  </div>
);
