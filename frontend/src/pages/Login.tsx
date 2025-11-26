import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import AuthForm from "../components/AuthForm";
import type { LoginSchema } from "../schemas/authSchemas";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: LoginSchema) => {
    try {
      const data = await login(values);
      
      localStorage.setItem("token", data.access_token ?? data.token ?? "");
      alert("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <AuthForm
        title="Log in"
        subtext="Welcome back! Please enter your details."
        buttonText="Log in"
        mode="login"
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default Login;
