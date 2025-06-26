import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validateEmail } from "../utils/validators";
import { useForm } from "../hooks/useForm";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const { values, errors, handleChange, handleSubmit, setErrors } = useForm({
    config: {
      email: {
        required: true,
        label: "Email",
        validate: (val) =>
          !validateEmail(val) ? "Invalid email" : null,
      },
      password: {
        required: true,
        label: "Password",
      },
    },
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      const result = await login(email, password);
      if (result.success) {
        navigate("/");
      } else {
        setAuthError("Invalid email or password");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow relative">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {authError && (
        <p className="text-red-600 text-sm text-center mb-4 absolute top-12 left-1/2 transform -translate-x-1/2 ">
          {authError}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          label="Email"
          type="email"
          value={values.email}
          placeholder="Enter your email"
          onChange={(e) => {
            handleChange("email")(e);
            setAuthError("");
          }}
          error={errors.email}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          value={values.password}
          placeholder="Enter your password"
          onChange={(e) => {
            handleChange("password")(e);
            setAuthError("");
          }}
          error={errors.password}
        />

        <Button
          htmlType="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
