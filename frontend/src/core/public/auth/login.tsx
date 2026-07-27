import GenericInput from "@/components/common/GenericInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import type { ILoginInterface } from "@/interface/auth.interface";
import { loginSchema } from "@/service/auth/auth.schema";
import { Eye, EyeClosed } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<ILoginInterface>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const { login, isLoading } = useAuth();

  const onSubmit = (data: ILoginInterface) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Container */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-border">
        {/* LEFT SIDE - Branding */}
        <div className="hidden md:flex flex-col justify-center p-10 gradient-primary text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome Back 💪</h1>
          <p className="text-lg text-white/80">
            Track your workouts, manage memberships, and stay consistent.
          </p>

          <div className="mt-10 space-y-3 text-sm text-white/80">
            <p>✔ Manage Members</p>
            <p>✔ Track Attendance</p>
            <p>✔ Monitor Payments</p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="bg-card p-6 sm:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            Login to your account
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your credentials to continue
          </p>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <GenericInput
                type="email"
                label="Email or Username"
                name="email"
                placeholder="Enter your email or username"
                isRequired
                control={control}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-input-bg border border-border focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <GenericInput
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                isRequired
                control={control}
                className="pr-12 px-4 py-2 rounded-lg  border border-border focus:ring-2 focus:ring-primary outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-7.5 h-6 w-6 flex items-center bg-none justify-center text-xs text-primary  rounded-sm cursor-pointer"
              >
                {showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
              </button>
            </div>

            {/* Options */}
            <div className="flex justify-end text-sm">
              <Link to="/" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <Button
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition btn-glow "
            >
              Log In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
