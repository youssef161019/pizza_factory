import React from "react";
import "./loading.scss";
function Loading() {
  return (
    <div className="loading_screen_layout">
      <div className="loading_screen_layout-title">Loading</div>
      <div className="lds-roller">
        {[...Array(8)].map((_,index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
}

export default Loading;
