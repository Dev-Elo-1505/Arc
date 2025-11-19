import { type UseFormRegister, type FieldError } from "react-hook-form";

type InputType = "text" | "email" | "password";

interface AuthFormFieldProps {
    label: string;
    type: InputType;
    id: string;
    register: UseFormRegister<any>;
    error?: FieldError;
}

const AuthFormField = ({ label, type, id, register, error }: AuthFormFieldProps) => {
  return (
    <div>
        <label htmlFor={id} className="text-sm block mb-2">{label}</label>
        <input type={type} id={id} placeholder={label} {...register(id)} className={`border rounded-full py-2 px-5  outline-0 mb-4 w-full focus:border-dark text-sm ${error ? "border-red-500" : "border-gray"}`} />
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}

export default AuthFormField