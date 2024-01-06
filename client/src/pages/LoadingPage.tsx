import React from "react";
import ReactLoading from "react-loading";

function LoadingPage() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 w-full"
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

export function LoadingPageAdmin() {
  return (
    <div className="h-[709px] w-full flex justify-center items-center">
      <ReactLoading
        type="bubbles"
        color="#10b981"
        height={"10%"}
        width={"10%"}
      />
      <div
        className="fixed inset-0 flex items-center justify-center z-50 w-full"
        style={{ background: "rgba(0, 0, 0, 0.75)" }}
      ></div>
    </div>
  );
}

export default LoadingPage;
