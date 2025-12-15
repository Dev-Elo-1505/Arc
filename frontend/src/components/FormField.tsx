import { type UseFormRegister, type FieldError } from "react-hook-form";
import { cn } from "../utils/cn";
import { ChevronDown } from "lucide-react";

type InputType = "text" | "email" | "password" | "date";

interface BaseFormFieldProps {
    label: string;
    id: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    required?: boolean;
    customClass?: string;
}

interface InputFieldProps extends BaseFormFieldProps {
  type: InputType;
  fieldType?: "input";
}

interface TextareaFieldProps extends BaseFormFieldProps {
  fieldType: "textarea";
  rows?: number;
}

interface SelectFieldProps extends BaseFormFieldProps {
  fieldType: "select";
  options: { value: string; label: string }[];
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

const FormField = (props: FormFieldProps) => {
  const { label, id, register, error, required, customClass } = props;

  const baseInputClasses = cn(`border rounded-full h-10 px-6 outline-0 w-full focus:border-dark text-sm ${error ? "border-red-500" : "border-gray"}`, customClass);
  return (
    <div className="mb-4">
        <label htmlFor={id} className="text-sm block mb-2">
        {label} {!required && <span className="text-gray text-xs">(optional)</span>}
      </label>
      
      {(!props.fieldType || props.fieldType === "input") && (
        <input
          type={props.type}
          id={id}
          placeholder={label}
          {...register(id)}
          className={baseInputClasses}
        />
      )}
      
      {props.fieldType === "textarea" && (
        <textarea
          id={id}
          placeholder={label}
          rows={props.rows || 4}
          {...register(id)}
          className={`${baseInputClasses} h-auto resize-none`}
        />
      )}
      
      {props.fieldType === "select" && (
        <div className="relative">
          <select
          id={id}
          {...register(id)}
          className={`${baseInputClasses} appearance-none`}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        size={18}
      />
        </div>
        
      )}

      
      
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

    </div>
  )
}

export default FormField