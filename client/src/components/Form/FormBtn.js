import React from "react";

export const FormBtn = props => {
  const float = props.float
  return (
    <button {...props} style={{ float: {float}, marginBottom: 10 }} className="btn btn-sm btn-success">
      {props.children}
    </button>
  )
};
