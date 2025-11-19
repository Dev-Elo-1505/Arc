interface ButtonProps {
  text: string;
  onClick?: () => void;
  customClass?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({ text, onClick, customClass, type = "button", disabled = false }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`rounded-full p-2 bg-primary transition-all duration-200 text-white w-full ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-primary"
      } ${customClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
