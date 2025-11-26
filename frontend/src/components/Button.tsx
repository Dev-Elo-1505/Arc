import type React from "react";
import { cn } from "../utils/cn"

interface ButtonProps {
  text: string | React.ReactNode;
  onClick?: () => void;
  customClass?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  text,
  onClick,
  customClass,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(`group relative inline-flex w-full cursor-pointer h-10 items-center justify-center overflow-hidden rounded-full bg-primary px-6 font-medium text-light transition ease-in-out hover:scale-110 font-inter ${disabled ? "opacity-50 cursor-not-allowed" : ""}`, customClass)}
    >
      <span>{text}</span>
      
      <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </button>
  );
};

export default Button;
