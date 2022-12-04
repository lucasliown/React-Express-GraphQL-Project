import React from "react";
import "../CSS/character.css";
import "../CSS/background.css";

//this is the loading component
function Loading() {
  return (
    <div className="d-flex justify-content-center mt-5">
    <div
      className="spinner-grow mx-1 loadingColor1 "
      role="status"
    ></div>
    <div
      className="spinner-grow mx-1 loadingColor2 "
      role="status"
    ></div>
    <div
      className="spinner-grow mx-1 loadingColor3 "
      role="status"
    ></div>
    <div
      className="spinner-grow mx-1 loadingColor4 "
      role="status"
    ></div>
    <div className="sr-only mx-2 mt-1 navbarBrand">Loading....</div>
  </div>
  );
}

export default Loading;