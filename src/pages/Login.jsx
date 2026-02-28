import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-purple-600 mb-6">
          SpendSense Login
        </h2>

        <input
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white py-3 rounded-lg"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}