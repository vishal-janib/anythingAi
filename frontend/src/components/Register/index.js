import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const userDetails = { username, email, password };

    const response = await fetch(
      "https://anythingai-1-r29q.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      },
    );

    const data = await response.json();

    if (response.ok) {
      alert("Registration Successful");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
