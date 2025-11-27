import React from "react";

export function PageLoader() {
  return (
    <div className="lds-ellipsis flex justify-center items-center mx-auto">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
