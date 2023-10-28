import React from "react";
import "./RegisterPage.css";

function LoginPage() {
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <section className="login">
        <div className="form-wrapper">
          <form className="" action="" onSubmit={submit}>
            <h1>Login</h1>
            <div>
              <label htmlFor="">Email</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input type="text" />
            </div>
            <button>Login</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
