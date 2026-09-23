import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageTrans from "@/components/common/LanguageTrans";

import { getTextByLanguage } from "@/i18n/i18n";
import { registerSchema } from "@/service/auth/auth.schema";
import { useSignup } from "@/service/auth/auth.service";

import type { ISignupInterface } from "@/interface/auth.interface";
import type { FieldConfig } from "@/components/form/types";
import { DynamicForm } from "@/components/form/DynamicForm";

const RegisterForm = () => {
  const { t } = useTranslation();
  const { mutate: signupMutation, isPending } = useSignup();

  const fields: FieldConfig[] = useMemo(
    () => [
      {
        name: "username",
        label: t("auth:signup.username"),
        type: "text",
        placeholder: getTextByLanguage(
          "Enter your username",
          "आफ्नो प्रयोगकर्ता नाम प्रविष्ट गर्नुहोस्",
        ),
        initialValue: "",
        colSpan: 3,
      },
      {
        name: "email",
        label: t("auth:signup.email"),
        type: "text",
        placeholder: getTextByLanguage(
          "Enter your email",
          "आफ्नो इमेल प्रविष्ट गर्नुहोस्",
        ),
        initialValue: "",
        colSpan: 3,
      },
      {
        name: "password",
        label: t("auth:signup.password"),
        type: "password",
        placeholder: getTextByLanguage(
          "Enter your password",
          "आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्",
        ),
        initialValue: "",
        colSpan: 3,
        showPasswordRules: true,
      },
      {
        name: "confirmPassword",
        label: t("auth:signup.confirmPassword"),
        type: "password",
        placeholder: getTextByLanguage(
          "Re-enter your password",
          "आफ्नो पासवर्ड पुनः प्रविष्ट गर्नुहोस्",
        ),
        initialValue: "",
        colSpan: 3,
        matchField: "password",
      },
    ],
    [t],
  );

  const handleSignup = (value: ISignupInterface) => {
    signupMutation(value);
  };

  return (
    // Same fixed inset-0 approach as Login — pulls this page out of
    // normal document flow so it fills the real viewport regardless of
    // any parent layout/route wrapper's max-width or padding.
    <div className="fixed inset-0 z-50 grid lg:grid-cols-2 bg-background overflow-y-auto">
      <div className="hidden lg:flex bg-primary p-10 flex-col justify-center">
        <h1 className="text-4xl font-bold text-white">
          {getTextByLanguage("Welcome 💪", "स्वागत छ 💪")}
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
                "Create your account",
                "आफ्नो खाता सिर्जना गर्नुहोस्",
              )}
            </h2>

            <LanguageTrans />
          </div>

          <p className="text-sm text-muted-foreground mt-2 mb-6">
            {getTextByLanguage(
              "Enter your details to sign up",
              "साइन अप गर्न आफ्नो विवरणहरू प्रविष्ट गर्नुहोस्",
            )}
          </p>

          <div className="w-full">
            <DynamicForm
              config={fields}
              validationSchema={registerSchema}
              onSubmit={handleSignup}
              submitButtonText={getTextByLanguage("Sign Up", "साइन अप")}
              loading={isPending}
            />
          </div>

          <div className="flex justify-end text-sm mt-4">
            <Link to="/login" className="text-primary hover:underline">
              {getTextByLanguage(
                "Already have an account? Log in",
                "पहिले नै खाता छ? लगइन गर्नुहोस्",
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
