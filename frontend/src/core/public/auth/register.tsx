import { useState } from "react";
import GenericInput from "@/components/common/GenericInput";
import { getTextByLanguage } from "@/i18n/i18n";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/service/auth/auth.schema";
import type { ISignupInterface } from "@/interface/auth.interface";
import { useTranslation } from "react-i18next";
import { Eye, EyeClosed, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LanguageTrans from "@/components/common/LanguageTrans";
import { cn } from "@/lib/utils";
import { useSignup } from "@/service/auth/auth.service";

const RegisterFrom = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { t } = useTranslation();

  const { mutate: signupMutation, isPending } = useSignup();

  const { control, handleSubmit } = useForm<ISignupInterface>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const password = useWatch({ control, name: "password" }) || "";
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  const passwordsMatch =
    !!password && !!confirmPassword && password === confirmPassword;

  // Password requirement rules
  const passwordRules = [
    {
      label: getTextByLanguage("At least 8 characters", "कम्तीमा ८ अक्षरहरू"),
      test: (val: string) => val.length >= 8,
    },
    {
      label: getTextByLanguage("One uppercase letter", "एउटा ठूलो अक्षर"),
      test: (val: string) => /[A-Z]/.test(val),
    },
    {
      label: getTextByLanguage("One lowercase letter", "एउटा सानो अक्षर"),
      test: (val: string) => /[a-z]/.test(val),
    },
    {
      label: getTextByLanguage("One number", "एउटा नम्बर"),
      test: (val: string) => /[0-9]/.test(val),
    },
    {
      label: getTextByLanguage("One special character", "एउटा विशेष चिन्ह"),
      test: (val: string) => /[^A-Za-z0-9]/.test(val),
    },
  ];

  const handleSignup = (value: ISignupInterface) => {
    signupMutation(value);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-border">
        <div className="hidden md:flex flex-col justify-center p-10 gradient-primary text-white">
          <h1 className="text-4xl font-bold mb-4">
            {getTextByLanguage("Welcome 💪", "स्वागत छ 💪")}
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
                "Create your account",
                "आफ्नो खाता सिर्जना गर्नुहोस्",
              )}
            </h2>
            <LanguageTrans />
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {getTextByLanguage(
              "Enter your details to sign up",
              "साइन अप गर्न आफ्नो विवरणहरू प्रविष्ट गर्नुहोस्",
            )}
          </p>

          <form
            noValidate
            onSubmit={handleSubmit(handleSignup)}
            className="space-y-5"
          >
            {/* Username */}
            <div>
              <GenericInput
                type="text"
                label={t("auth:signup.username")}
                name="username"
                placeholder={getTextByLanguage(
                  "Enter your username",
                  "आफ्नो प्रयोगकर्ता नाम प्रविष्ट गर्नुहोस्",
                )}
                isRequired
                control={control}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-input-bg border border-border focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <GenericInput
                type="email"
                label={t("auth:signup.email")}
                name="email"
                placeholder={getTextByLanguage(
                  "Enter your email",
                  "आफ्नो इमेल प्रविष्ट गर्नुहोस्",
                )}
                isRequired
                control={control}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-input-bg border border-border focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <GenericInput
                label={t("auth:signup.password")}
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

              {/* Password requirements checklist */}
              {password && (
                <ul className="mt-2 space-y-1">
                  {passwordRules.map((rule, idx) => {
                    const passed = rule.test(password);
                    return (
                      <li
                        key={idx}
                        className={cn(
                          "flex items-center gap-1.5 text-xs transition-colors",
                          passed ? "text-green-600" : "text-muted-foreground",
                        )}
                      >
                        {passed ? (
                          <Check size={12} className="shrink-0" />
                        ) : (
                          <X size={12} className="shrink-0" />
                        )}
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <GenericInput
                label={t("auth:signup.confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder={getTextByLanguage(
                  "Re-enter your password",
                  "आफ्नो पासवर्ड पुनः प्रविष्ट गर्नुहोस्",
                )}
                name="confirmPassword"
                isRequired
                control={control}
                className={cn(
                  "pr-12 px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-colors",
                  passwordsMatch
                    ? "border-green-500 focus:ring-green-500"
                    : "border-border focus:ring-primary",
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={cn(
                  "absolute right-4 top-7.5 h-6 w-6 flex items-center bg-none justify-center text-xs rounded-sm cursor-pointer",
                  passwordsMatch ? "text-green-500" : "text-primary",
                )}
              >
                {passwordsMatch ? (
                  <Check size={16} />
                ) : showConfirmPassword ? (
                  <Eye size={16} />
                ) : (
                  <EyeClosed size={16} />
                )}
              </button>
              {passwordsMatch && (
                <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                  <Check size={14} />
                  {getTextByLanguage("Passwords match", "पासवर्डहरू मिल्दछन्")}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="flex justify-end text-sm">
              <Link to="/login" className="text-primary hover:underline">
                {getTextByLanguage(
                  "Already have an account? Log in",
                  "पहिले नै खाता छ? लगइन गर्नुहोस्",
                )}
              </Link>
            </div>

            {/* Button */}
            <Button
              disabled={isPending}
              loading={isPending}
              type="submit"
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition btn-glow "
            >
              {getTextByLanguage("Sign Up", "साइन अप")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterFrom;
