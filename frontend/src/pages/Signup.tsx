import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth.api";
import AuthForm from "../components/AuthForm";
import type { SignupSchema } from "../schemas/authSchemas";

const Signup = () => {
  const navigate = useNavigate();
  
  const handleSignup = async (values: SignupSchema) => {
    try {
      const data = await signup(values);
      localStorage.setItem("token", data.token);
      alert("Account created!");
      navigate("/auth/login");
    } catch (error) {
      alert("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div>
      <AuthForm
        title="Create an Account"
        subtext="Get started with your free account"
        buttonText="Create Account"
        mode="signup"
        onSubmit={handleSignup}
      />
    </div>
  );
};

export default Signup;
