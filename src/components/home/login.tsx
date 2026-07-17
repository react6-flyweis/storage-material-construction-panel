import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import bgImage from "../../assets/AuthBackgroundImg.jpg";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import type { AxiosError } from "axios";
import { loginWithEmailSchema, type LoginWithEmailInput } from "../../schema/login.schema";
import { loginWithEmailApi } from "../../api/auth.api";
import { useAuthStore } from "../../store/authStore";
import type { AuthResponse } from "../../types/auth.types";

function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginWithEmailInput>({
    resolver: zodResolver(loginWithEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: (payload: LoginWithEmailInput) => loginWithEmailApi(payload),
    onSuccess: (response) => {
      const responseData = response.data as AuthResponse;

      if (!responseData?.success || !responseData?.data) {
        setError("root", { type: "server", message: responseData?.message || "Failed to log in" });
        return;
      }

      const { accessToken, refreshToken, user, role } = responseData.data;

      if (role !== "construction") {
        setError("root", { type: "server", message: "Access denied. Only construction roles are authorized to sign in." });
        return;
      }

      if (accessToken && refreshToken) {
        setAuth(accessToken, refreshToken, user);
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      } else {
        setError("root", { type: "server", message: "Invalid response from server. Token is missing." });
      }
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message || err.message || "Failed to log in";
      setError("root", { type: "server", message });
    },
  });

  const onSubmit = (data: LoginWithEmailInput) => {
    clearErrors("root");
    loginMutate({
      email: data.email.trim(),
      password: data.password.trim(),
    });
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            id="email"
            label="E-mail"
            type="text"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="space-y-1">
            <Input
              id="password"
              label="Password"
              type="password"
              isPassword
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

          {errors.root && (
            <p className="text-sm text-red-500 font-medium text-center">
              {errors.root.message}
            </p>
          )}

          <Button
            title="Login"
            type="submit"
            className="w-full"
            loading={isPending}
            disabled={isPending}
          />

          <div className="flex justify-end pt-2">
            <span
              onClick={() => navigate("/forgot-password")}
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
