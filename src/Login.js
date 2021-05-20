import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(1);
    fetch("http://localhost:3001/authenticate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) =>
      response.json().then((data) => console.log(data.auth_token))
    );
  };

  const handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Log In</h1>
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
        <button placeholder="submit" type="submit">
          Log In
        </button>
        <div>
          or <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
