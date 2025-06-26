import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="absolute left-0 top-full  text-red-500 text-sm">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="absolute left-0 top-full  text-red-500 text-sm">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
