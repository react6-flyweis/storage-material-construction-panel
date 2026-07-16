type ClockIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const ClockIcon = ({
  size = 20,
  color = "#EAB308",
  className = "",
}: ClockIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.99999 18.3346C14.6024 18.3346 18.3333 14.6037 18.3333 10.0013C18.3333 5.39893 14.6024 1.66797 9.99999 1.66797C5.39761 1.66797 1.66666 5.39893 1.66666 10.0013C1.66666 14.6037 5.39761 18.3346 9.99999 18.3346Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10.0034 5L10.0029 10.0037L13.536 13.5368"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClockIcon;
