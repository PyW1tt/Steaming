import React from "react";
import { useState } from "react";
import "./RegisterPage.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(username);
    console.log(password);
    console.log(email);
  }

  return (
    <>
      <section className="register">
        <div className="form-wrapper">
          <form action="" onSubmit={submit}>
            <h1>Register</h1>
            <div>
              <label htmlFor="">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <button>Register</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
