import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "./firebase";
function Login({ user }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const islogin = await auth.signInWithEmailAndPassword(email, password);
    //   console.log(islogin.user.uid);
      window.M.toast({ html: "Succesfully Login", classes: "rounded blue" });
      history.push("/");
    } catch (err) {
    //   console.log(err);
      window.M.toast({ html: `${err.message}`, classes: "rounded red" });
    }
  };
  if (user) {
    // console.log(user);
    history.push("/");
  }
  return (
    <div className="center container" style={{ maxWidth: "500px" }}>
      <h4>Login</h4>
      <form className="input-field" onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="waves-effect waves-light btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
