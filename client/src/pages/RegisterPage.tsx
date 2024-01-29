import React, { useState } from "react";
import "../component/register/RegisterPage.css";
import Register from "../component/register/Register";
import Package from "../component/register/Package";
import Payment from "../component/register/Payment";
import { Step1, Step2, Step3 } from "../../public/icon/Stepper";

function RegisterPage() {
  const [step, setStep] = useState<string>("register");

  return (
    <>
      <section className="register">
        <div className="form-wrapper">
          <div className=" flex justify-between bg-etc-white mb-10 text-gray-500 items-center">
            <div className=" flex flex-col items-center">
              <Step1
                colorBg={step === "register" ? "#000" : "#10b981"}
                colorNum={step === "register" ? "#10b981" : "#fff"}
              />
              <span className="mt-1 text-white">Information</span>
            </div>
            <div className="flex flex-col items-center">
              <Step2
                colorBg={
                  step === "package"
                    ? "#000"
                    : step === "payment"
                    ? "#10b981"
                    : ""
                }
                colorNum={
                  step === "package"
                    ? "#10b981"
                    : step === "payment"
                    ? "#fff"
                    : ""
                }
              />
              <span className="mt-1 text-white">Choose Package</span>
            </div>
            <div className=" flex flex-col items-center">
              <Step3
                colorBg={step === "payment" ? "#000" : ""}
                colorNum={step === "payment" ? "#10b981" : ""}
              />
              <span className="mt-1 text-white">Payment</span>
            </div>
          </div>
          {step === "register" && <Register setStep={setStep} />}
          {step === "package" && <Package setStep={setStep} />}
          {step === "payment" && <Payment />}
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
