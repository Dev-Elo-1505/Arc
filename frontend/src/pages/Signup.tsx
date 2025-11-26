import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth.api";
import AuthForm from "../components/AuthForm";
import type { SignupSchema } from "../schemas/authSchemas";
import { SIGNUP_ERRORS } from "../utils/errorMessages";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (values: SignupSchema) => {
    try {
      const data = await signup(values);
      localStorage.setItem("token", data.token);
      toast.success("Account created!");
      navigate("/auth/login");
    } catch (error: any) {
      if (error.response.data.error == "Email already exists") {
        toast.error(SIGNUP_ERRORS.EMAIL_EXISTS);
      } else {
        toast.error(SIGNUP_ERRORS.DEFAULT);
      }
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
