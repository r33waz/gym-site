import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageTrans from "@/components/common/LanguageTrans";

import { getTextByLanguage } from "@/i18n/i18n";
import { useAuth } from "@/context/AuthContext";

import { loginSchema } from "@/service/auth/auth.schema";

import type { ILoginInterface } from "@/interface/auth.interface";
import type { FieldConfig } from "@/components/form/types";
import { DynamicForm } from "@/components/form/DynamicForm";
import useToggle from "@/hooks/useToggle";

const Login = () => {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const { isOpen, setIsOpen } = useToggle();

  const fields: FieldConfig[] = useMemo(
    () => [
      {
        name: "email",
        label: t("auth:login.email"),
        type: "text",
        placeholder: getTextByLanguage(
          "Enter your email or username",
          "आफ्नो इमेल वा प्रयोगकर्ता नाम प्रविष्ट गर्नुहोस्",
        ),
        initialValue: "",
        colSpan: 3,
      },
      {
        name: "password",
        label: t("auth:login.password"),
        type: "password",
        placeholder: getTextByLanguage(
          "Enter your password",
          "आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्",
        ),
        initialValue: "",
        colSpan: 3,
      },
    ],
    [t],
  );

  const onSubmit = (data: ILoginInterface) => {
    login(data);
  };

  return (
    // fixed + inset-0 pulls this page fully out of normal document flow —
    // it ignores whatever max-width/padding/centering a parent layout or
    // route wrapper applies, and always covers the real viewport edge to
    // edge regardless of where Login gets mounted in the tree.
    <div className="fixed inset-0 z-50 grid lg:grid-cols-2 bg-background overflow-y-auto">
      <div className="hidden lg:flex bg-primary p-10 flex-col justify-center">
        <h1 className="text-4xl font-bold text-white">
          {getTextByLanguage("Welcome Back 💪", "फेरि स्वागत छ 💪")}
        </h1>

        <p className="mt-4 text-white/80 max-w-md">
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
            {getTextByLanguage("Monitor Payments", "भुक्तानी अनुगमन गर्नुहोस्")}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">
              {getTextByLanguage(
                "Login to your account",
                "आफ्नो खातामा लगइन गर्नुहोस्",
              )}
            </h2>

            <LanguageTrans />
          </div>

          <p className="text-sm text-muted-foreground mt-2 mb-6">
            {getTextByLanguage(
              "Enter your credentials to continue",
              "जारी राख्न आफ्नो प्रमाणहरू प्रविष्ट गर्नुहोस्",
            )}
          </p>

          <div className="w-full">
            <DynamicForm
              config={fields}
              validationSchema={loginSchema}
              onSubmit={onSubmit}
              submitButtonText={getTextByLanguage("Log In", "लगइन")}
              loading={isLoading}
              btnclass="w-full"
            />
          </div>

          <div className="flex justify-end text-sm mt-4">
            <Link to="/" className="text-primary hover:underline">
              {getTextByLanguage("Forgot password?", "पासवर्ड बिर्सनुभयो?")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
