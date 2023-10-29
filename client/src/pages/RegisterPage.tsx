import React from "react";
import "../component/register/RegisterPage.css";
import Register from "../component/register/Register";
import Package from "../component/register/Package";
import Payment from "../component/register/Payment";
import PaymentMui from "../component/register/PaymentMui";

function RegisterPage() {
  return (
    <>
      <section className="register">
        <div className="form-wrapper">
          {/* <Register /> */}
          {/* <Package /> */}
          {/* <Payment /> */}
          <PaymentMui />
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
