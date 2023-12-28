import React from "react";
import { PropState } from "../../model/PropState";
import { useOmise } from "../../context/omisecontext";

function Package(prop: PropState): JSX.Element {
  const { setOmiseCard } = useOmise();
  return (
    <div className="">
      <p className=" text-center font-semibold text-2xl mb-6">
        Choose your plan
      </p>
      <div className=" flex justify-between">
        <button
          className="font-bold bg-emerald-400 transition ease-in-out delay-100 px-6 py-3 rounded-[10px] w-[175px] h-[46px] items-center hover:-translate-y-1 hover:scale-125 hover:bg-emerald-600 duration-300"
          onClick={() => {
            setOmiseCard((prevOmiseCard) => ({
              ...prevOmiseCard,
              totalAmount: "171.11",
            }));
            prop.setStep("payment");
          }}
        >
          <p>$4.99/month </p>
        </button>

        <button
          className="font-bold bg-emerald-400 transition ease-in-out delay-100 px-6 py-3 rounded-[10px] w-[175px] h-[46px] items-center hover:-translate-y-1 hover:scale-125 hover:bg-emerald-600 duration-300"
          onClick={() => {
            setOmiseCard((prevOmiseCard) => ({
              ...prevOmiseCard,
              totalAmount: "1714.16",
            }));
            prop.setStep("payment");
          }}
        >
          <p>$49.99/year</p>
        </button>
      </div>
    </div>
  );
}

export default Package;
