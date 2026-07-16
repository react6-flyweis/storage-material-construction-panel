import { useState } from "react";
import bgImage from "../../assets/AuthBackgroundImg.jpg";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-[500px] bg-white rounded-[10px] shadow-2xl p-4 sm:p-10 md:p-12 relative z-10 mx-auto">
        <div className="text-center mb-10">
          <h1 className="md:text-2xl text-xl text-[#1d7bd8] sm:text-3xl font-medium mb-2">
            Sign In
          </h1>
          <p className="text-(--text-color-gray) text-sm sm:text-base">
            Let's build something great
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            label="E-mail or phone number"
            type="text"
            placeholder="Enter your email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="space-y-1">
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button title="Login" type="submit" className="w-full" />

          <div className="flex justify-end pt-2">
            <span onClick={()=>navigate("/forgot-password")}
              className="text-sm font-normal text-[#1d7bd8] hover:opacity-80 transition-colors cursor-pointer"
            >
              Forgot Password?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
