import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import AuthForm from "../components/AuthForm";
import type { LoginSchema } from "../schemas/authSchemas";
import { LOGIN_ERRORS } from "../utils/errorMessages";
import { toast } from 'sonner'
import { useUser } from "../context/UserProvider";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (values: LoginSchema) => {
    try {
      const data = await login(values);
      
      localStorage.setItem("token", data.access_token ?? data.token ?? "");
      setUser(data.user);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response.data.error == "Invalid credentials") {
        toast.error(LOGIN_ERRORS.INVALID_CREDENTIALS);
      } else {
        toast.error(LOGIN_ERRORS.DEFAULT);
      }
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
