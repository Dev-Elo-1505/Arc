import { Link } from "react-router-dom";
import authImg from "../assets/auth.svg";
import AuthFormField from "./AuthFormField";
import { MoveLeft } from "lucide-react";
import Button from "./Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors } from "react-hook-form";
import {
  loginSchema,
  signupSchema,
  type LoginData,
  type SignupData,
} from "../schemas/authSchemas";

interface AuthFormProps {
  title: string;
  subtext: string;
  buttonText: string;
  mode: "login" | "signup";
  onSubmit: (data: LoginData | SignupData) => void | Promise<void>;
}

const AuthForm = ({
  title,
  subtext,
  buttonText,
  onSubmit,
  mode,
}: AuthFormProps) => {
  const isSignup = mode === "signup";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupData | LoginData>({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
  });

  const onFormSubmit: SubmitHandler<LoginData | SignupData> = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <section className="flex h-screen justify-center font-inter bg-light text-dark lg:items-center lg:justify-between lg:gap-10">
      <div className="hidden lg:flex w-1/2 bg-primary-light h-full p-2">
        <img src={authImg} alt="Authentication Illustration" /></div>
      <div className="w-full lg:w-1/2 xl:w-[55%] flex items-start lg:items-center px-6 py-8 md:px-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md">
          <Link to="/">
            <MoveLeft strokeWidth={1} color="#212121" />
          </Link>
          <form onSubmit={handleSubmit(onFormSubmit)}>
          <h1 className="text-2xl">{title}</h1>
          <p className="text-gray text-xs mb-4">{subtext}</p>
          {isSignup && (
              <div className="md:flex gap-4">
                <div className="flex-1">
                  <AuthFormField 
                    label="First Name" 
                    type="text" 
                    id="firstName"
                    register={register}
                    error={(errors as FieldErrors<SignupData>).firstName}
                  />
                </div>
                <div className="flex-1">
                  <AuthFormField 
                    label="Last Name" 
                    type="text" 
                    id="lastName"
                    register={register}
                    error={(errors as FieldErrors<SignupData>).lastName}
                  />
                </div>
              </div>
            )}

          <AuthFormField label="Email Address" type="email" id="email" register={register} error={errors.email} />

          <AuthFormField label="Password" type="password" id="password" register={register} error={errors.password} />

          <Button text={isSubmitting ? "Loading..." : buttonText} disabled={isSubmitting} />
          {mode === "login" && (
            <p className="text-xs text-gray mt-2 text-center">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-dark font-medium">
                Sign up
              </Link>
            </p>
          )}
          {mode === "signup" && (
            <p className="text-xs text-gray mt-2 text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-dark font-medium">
                Log in
              </Link>
            </p>
          )}
        </form>
        </div>
      </div>
    
        
      
    </section>
  );
};

export default AuthForm;
