import React from "react";

export const TextArea = props => (
  <div className="form-group">
    <label className="label-float" style={{color: "black", fontSize: "1em"}}>{props.label}</label>
    <br/>
    <textarea className="form-control" rows="15" {...props} />
  </div>
);
