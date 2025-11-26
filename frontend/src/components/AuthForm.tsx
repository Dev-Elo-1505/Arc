import { Link } from "react-router-dom";
import authImg from "../assets/auth.svg";
import AuthFormField from "./AuthFormField";
import { MoveLeft } from "lucide-react";
import Button from "./Button";
import { useForm, type SubmitHandler, type FieldError, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  signupSchema,
  type LoginSchema,
  type SignupSchema,
} from "../schemas/authSchemas";
import Spinner from "./Spinner";

type Mode = "login" | "signup";

type FormDataFromMode<M extends Mode> = M extends "signup" ? SignupSchema : LoginSchema;

interface AuthFormProps<M extends Mode> {
  title: string;
  subtext: string;
  buttonText: string;
  mode: M;
  onSubmit: (data: FormDataFromMode<M>) => void | Promise<void>;
}

const AuthForm = <M extends Mode>({
  title,
  subtext,
  buttonText,
  onSubmit,
  mode,
}: AuthFormProps<M>) => {
  const isSignup = mode === "signup";

  const {
    register,
    handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormDataFromMode<M>>({
    // resolver needs the correct schema at runtime — zodResolver accepts the active schema
    resolver: zodResolver(isSignup ? signupSchema : loginSchema) as any,
  });

  const onFormSubmit: SubmitHandler<FormDataFromMode<M>> = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <section className="relative flex h-screen justify-center font-inter bg-light text-dark lg:items-center lg:justify-between lg:gap-10">
      <div className="hidden lg:flex w-1/2 bg-primary-light h-full p-2 items-center justify-center">
        <img src={authImg} alt="Authentication Illustration" width={400} height={400} />
      </div>
      <div className="w-full lg:w-1/2 xl:w-[55%] flex items-start lg:items-center px-6 py-8 md:px-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md">
          <Link to="/" className="absolute top-4">
            <MoveLeft strokeWidth={1} color="#212121" />
          </Link>
          <form onSubmit={handleSubmit(onFormSubmit)} className="mt-6 md:mt-0">
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
                    error={(errors as FieldErrors<SignupSchema>).firstName as unknown as FieldError}
                  />
                </div>
                <div className="flex-1">
                  <AuthFormField
                    label="Last Name"
                    type="text"
                    id="lastName"
                    register={register}
                    error={(errors as FieldErrors<SignupSchema>).lastName as unknown as FieldError}
                  />
                </div>
              </div>
            )}

            <AuthFormField
              label="Email Address"
              type="email"
              id="email"
              register={register}
              error={errors.email as unknown as FieldError}
            />

            <AuthFormField
              label="Password"
              type="password"
              id="password"
              register={register}
              error={errors.password as unknown as FieldError}
            />

            <Button
              text={isSubmitting ? <Spinner /> : buttonText}
              type="submit"
              disabled={isSubmitting}
            />
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
