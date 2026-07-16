type Props = {
  loading?: boolean;
  title: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  loading,
  disabled,
  title,
  className,
  type = "button",
  ...props
}: Props) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`
        text-[18px] font-medium
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
      type={type}
    >
      {loading ? (
        <>
          {" "}
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-[#1D7BD8]" />

          <span>Please wait...</span>
        </>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
