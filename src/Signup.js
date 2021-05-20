import React, { useState, useEffect } from "react";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(2);
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: passwordConf,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleErrors = () => {
    return (
      <div>
        <ul>
          {errors.map((error) => {
            return <li>key={error}</li>;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          placeholder="password confirmation"
          type="password"
          name="password_confirmation"
          value={passwordConf}
          onChange={(event) => setPasswordConf(event.target.value)}
        />
        <button placeholder="submit" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default Signup;
