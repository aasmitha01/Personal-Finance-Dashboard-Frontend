import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful!");
      navigate("/"); // go to login
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgMain">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-primary mb-6">
          Create Account
        </h2>

        <input
          placeholder="Name"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-primary text-white py-3 rounded-lg"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-primary font-semibold">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}