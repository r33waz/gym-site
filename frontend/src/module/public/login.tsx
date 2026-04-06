import GenericInput from "@/components/common/GenericInput";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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

          <form className="space-y-5">
            {/* Email */}
            <div>
              <GenericInput
                type="email"
                label="Email"
                name="email"
                placeholder="Enter your email"
                isRequired
                // control={}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-input-bg border border-border focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-text-secondary">
                Password
              </label>

              <div className="relative mt-1">
                <GenericInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  isRequired
                  //   control={}
                  className="w-full px-4 py-2 rounded-lg bg-input-bg border border-border focus:ring-2 focus:ring-primary outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-sm text-primary"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <Input type="checkbox" className="accent-primary h-4 w-4" />
                Remember me
              </label>

              <button type="button" className="text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition btn-glow"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center mt-6 text-muted-foreground">
            Don’t have an account?{" "}
            <span className="text-primary cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
