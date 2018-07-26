import React from "react";

export const Container = ({ fluid, children, style }) => (
  <div className={`container${fluid ? "-fluid" : ""}`} style={{marginTop: 100, minHeight: 400}}>
    {children}
  </div>
);
