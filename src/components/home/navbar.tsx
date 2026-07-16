import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import CustomButton from "../customButton";
const tabs = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Delivery", path: "/delivery" },
  { label: "Contact Us", path: "/contact" },
];
export default function Navbar() {
  return (
    <div className="max-w-[1136px] mx-auto flex items-center justify-between gap-[8px] py-[33.5px]">
      <img src={Logo} alt="Logo" />
      <div className="flex gap-[80px] items-center">
        <div className="flex gap-[32px] items-center list-none">
          {tabs.map((tab) => (
              <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  `
                  text-dark-blue cursor-pointer
                  transition-all duration-300 linear
                  ${
                    isActive
                      ? "font-[700] underline"
                      : "font-[500] hover:underline"
                  }
                `
                }
              >
                {tab.label}
              </NavLink>
          ))}
        </div>
      <div className="flex items-center gap-4">
        <CustomButton title="Login" />
        <CustomButton title="Sign-Up" />
      </div>
      </div>
    </div>
  );
}