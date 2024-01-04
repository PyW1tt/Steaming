import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 "
      style={{ background: "rgba(0, 0, 0, 0.75)" }}
    >
      <ReactLoading
        type="bubbles"
        color="#10b981"
        height={"10%"}
        width={"10%"}
      />
    </div>
  );
}

export default Loading;
