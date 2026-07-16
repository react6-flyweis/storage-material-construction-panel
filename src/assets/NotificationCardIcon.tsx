type IconProps = {
  className?: string;
  color?: string; 
};

export default function NotificationBellIcon({
  className = "w-5 h-5",
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color }}
    >
      <g clipPath="url(#clip0)">
        <path
          d="M8.57143 18.9297H11.4286"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.7143 8.21429C15.7143 6.69876 15.1123 5.24531 14.0406 4.17367C12.969 3.10204 11.5155 2.5 10 2.5C8.48447 2.5 7.03103 3.10204 5.95939 4.17367C4.88776 5.24531 4.28571 6.69876 4.28571 8.21429V13.2143C4.28571 13.7826 4.05994 14.3277 3.65809 14.7296C3.25623 15.1314 2.71117 15.3571 2.14286 15.3571H17.8571C17.2889 15.3571 16.7437 15.1314 16.3419 14.7296C15.94 14.3277 15.7143 13.7826 15.7143 13.2143V8.21429Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.714287 8.02745C0.715057 6.66765 1.03934 5.32755 1.66034 4.11784C2.28134 2.90813 3.18124 1.86353 4.28572 1.07031"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.2857 8.02745C19.285 6.66765 18.9607 5.32755 18.3397 4.11784C17.7187 2.90813 16.8187 1.86353 15.7143 1.07031"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
