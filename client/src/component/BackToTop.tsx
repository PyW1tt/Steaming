import React, { useEffect, useState } from "react";

function BackToTop() {
  const [backToTop, setBackToTop] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="">
      {backToTop && (
        <div
          className="shadow-lg shadow-emerald-600/50 bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer animate-bounce fixed bottom-5 right-4 z-50"
          onClick={scrollUp}
        >
          <img src="../../icon/186407_arrow_up_icon.svg" alt="" />
        </div>
      )}
    </div>
  );
}

export default BackToTop;
