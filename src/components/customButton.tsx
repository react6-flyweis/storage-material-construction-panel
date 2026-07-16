import React from "react";

interface CustomButtonProps {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        text-[18px] font-semibold
        text-[#fff] cursor-pointer
        transition duration-300 ease-in-out
        border-2 border-[#1d7bd8]
        hover:bg-[#fff] hover:text-[#1D7BD8]
        px-[16px] py-[8px] min-w-[100px]
        rounded-[6px]
        bg-[#1D7BD8]
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {title}
    </button>
  );
};

export default CustomButton;
