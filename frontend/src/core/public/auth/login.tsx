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
import { useTranslation } from "react-i18next";
import LanguageTrans from "@/components/common/LanguageTrans";
import { getTextByLanguage } from "@/i18n/i18n";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<ILoginInterface>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const { t } = useTranslation();

  const { login, isLoading } = useAuth();

  const onSubmit = (data: ILoginInterface) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-border">
        <div className="hidden md:flex flex-col justify-center p-10 gradient-primary text-white">
          <h1 className="text-4xl font-bold mb-4">
            {getTextByLanguage("Welcome Back 💪", "फेरि स्वागत छ 💪")}
          </h1>
          <p className="text-lg text-white/80">
            {getTextByLanguage(
              "Track your workouts, manage memberships, and stay consistent.",
              "आफ्नो अभ्यास ट्र्याक गर्नुहोस्, सदस्यता व्यवस्थापन गर्नुहोस्, र निरन्तर रहनुहोस्।",
            )}
          </p>

          <div className="mt-10 space-y-3 text-sm text-white/80">
            <p>
              ✔{" "}
              {getTextByLanguage(
                "Manage Members",
                "सदस्यहरू व्यवस्थापन गर्नुहोस्",
              )}
            </p>
            <p>
              ✔{" "}
              {getTextByLanguage(
                "Track Attendance",
                "उपस्थिति ट्र्याक गर्नुहोस्",
              )}
            </p>
            <p>
              ✔{" "}
              {getTextByLanguage(
                "Monitor Payments",
                "भुक्तानी अनुगमन गर्नुहोस्",
              )}
            </p>
          </div>
        </div>

        <div className="bg-card p-6 sm:p-10 flex flex-col justify-center">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              {getTextByLanguage(
                "Login to your account",
                "आफ्नो खातामा लगइन गर्नुहोस्",
              )}
            </h2>
            <LanguageTrans />
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {getTextByLanguage(
              "Enter your credentials to continue",
              "जारी राख्न आफ्नो प्रमाणहरू प्रविष्ट गर्नुहोस्",
            )}
          </p>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <GenericInput
                type="email"
                label={t("auth:login.email")}
                name="email"
                placeholder={getTextByLanguage(
                  "Enter your email or username",
                  "आफ्नो इमेल वा प्रयोगकर्ता नाम प्रविष्ट गर्नुहोस्",
                )}
                isRequired
                control={control}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-input-bg border border-border focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <GenericInput
                label={t("auth:login.password")}
                type={showPassword ? "text" : "password"}
                placeholder={getTextByLanguage(
                  "Enter your password",
                  "आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्",
                )}
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
                {getTextByLanguage("Forgot password?", "पासवर्ड बिर्सनुभयो?")}
              </Link>
            </div>

            {/* Button */}
            <Button
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition btn-glow "
            >
              {getTextByLanguage("Log In", "लगइन")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
