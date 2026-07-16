type CheckIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const RightCheckIcon = ({
  size = 20,
  color = "#3AB449",
  className = "",
}: CheckIconProps) => {
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
        d="M4.16667 9.9987L8.33334 14.1654L16.6667 5.83203"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RightCheckIcon;
