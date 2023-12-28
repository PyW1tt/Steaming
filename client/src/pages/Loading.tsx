import React from "react";

function Loading() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 "
      style={{ background: "rgba(0, 0, 0, 0.75)" }}
    >
      <div className="w-[1000px] bg-[#28262d] h-[830px] rounded-2xl opacity-1 overflow-y-auto relative "></div>
    </div>
  );
}

export default Loading;
