import { forwardRef, useState } from "react";
import EyeIcon from "../../assets/EyeIcon.svg";
import EyeOffIcon from "../../assets/EyeIcon.svg";
type Props = {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, icon, isPassword, type, className, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const inputType = isPassword ? (show ? "text" : "password") : type;

    return (
      <div className="space-y-1">
        {label && <p className="mb-2 block text-sm font-medium">{label}</p>}

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/10 px-4 py-3 backdrop-blur">
          {icon && <span className="opacity-70">{icon}</span>}
<input
  ref={ref}
  type={inputType}
  className={`
    w-full bg-transparent outline-none
    text-[#111827]
    placeholder:text-[#9CA3AF]
    ${className ?? ""}
  `}
  {...props}
/>

          {isPassword && (
            <span
              onClick={() => setShow((v) => !v)}
              className="cursor-pointer opacity-70"
            >
              {show ? <img src={EyeIcon} alt="" /> : <img src={EyeOffIcon} alt="" />}
            </span>
          )}
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

export default Input;
