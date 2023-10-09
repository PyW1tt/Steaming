import React from "react";

function LoginPage() {
  function submit(event) {
    event.preventDefault();
  }

  return (
    <>
      <form action="" onSubmit={submit}>
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
    </>
  );
}

export default LoginPage;
