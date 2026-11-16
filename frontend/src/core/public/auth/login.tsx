import { Link } from "react-router-dom";

import LanguageTrans from "@/components/common/LanguageTrans";
import { getTextByLanguage } from "@/i18n/i18n";

const Login = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex bg-primary p-12 xl:p-16 flex-col justify-center">
        <div className="max-w-lg mx-auto w-full">
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
            {getTextByLanguage("Welcome Back 💪", "फेरि स्वागत छ 💪")}
          </h1>

          <p className="mt-5 text-base xl:text-lg text-white/80 leading-relaxed">
            {getTextByLanguage(
              "Track your workouts, manage memberships, and stay consistent.",
              "आफ्नो अभ्यास ट्र्याक गर्नुहोस्, सदस्यता व्यवस्थापन गर्नुहोस्, र निरन्तर रहनुहोस्।",
            )}
          </p>

          <div className="mt-10 space-y-4 text-sm text-white/90">
            <p className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                ✓
              </span>

              {getTextByLanguage(
                "Manage Members",
                "सदस्यहरू व्यवस्थापन गर्नुहोस्",
              )}
            </p>

            <p className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                ✓
              </span>

              {getTextByLanguage(
                "Track Attendance",
                "उपस्थिति ट्र्याक गर्नुहोस्",
              )}
            </p>

            <p className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                ✓
              </span>

              {getTextByLanguage(
                "Monitor Payments",
                "भुक्तानी अनुगमन गर्नुहोस्",
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
        <div className="w-full max-w-md">
          <div className="rounded-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {getTextByLanguage(
                    "Login to your account",
                    "आफ्नो खातामा लगइन गर्नुहोस्",
                  )}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {getTextByLanguage(
                    "Enter your credentials to continue",
                    "जारी राख्न आफ्नो प्रमाणहरू प्रविष्ट गर्नुहोस्",
                  )}
                </p>
              </div>

              <LanguageTrans />
            </div>

            <div className="mt-7"></div>

            <div className="mt-5 flex justify-end">
              <Link
                to="/"
                className="text-sm font-medium text-primary transition-colors hover:underline"
              >
                {getTextByLanguage("Forgot password?", "पासवर्ड बिर्सनुभयो?")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
