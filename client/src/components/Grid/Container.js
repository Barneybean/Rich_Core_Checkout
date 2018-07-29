import React from "react";

export const Container = ({ fluid, children, style }) => (
  <div className={`container${fluid ? "-fluid" : ""} bg`} style={{marginTop: 10, minHeight: 500}}>
    {children}
  </div>
);
