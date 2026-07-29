import { Link } from "react-router-dom";
import { getTextByLanguage } from "@/i18n/i18n";
import { useTranslation } from "react-i18next";
import {
  Dumbbell,
  Shield,
  Users,
  CreditCard,
  Bell,
  BarChart3,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { publicRoutePath } from "@/routes/path";

const LandingPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: getTextByLanguage("Role-Based Access", "भूमिका अनुसार पहुँच"),
      description: getTextByLanguage(
        "Super admins, gym owners, staff, and members each get a tailored dashboard with exactly the access they need.",
        "सुपर एडमिन, जिम मालिक, स्टाफ, र सदस्यहरूले आ-आफ्नो आवश्यकता अनुसारको ड्यासबोर्ड र पहुँच पाउँछन्।",
      ),
    },
    {
      icon: Users,
      title: getTextByLanguage("Member Management", "सदस्य व्यवस्थापन"),
      description: getTextByLanguage(
        "Track every member's plan, attendance, and progress from a single, organized view.",
        "एउटै व्यवस्थित ठाउँबाट प्रत्येक सदस्यको योजना, उपस्थिति, र प्रगति हेर्नुहोस्।",
      ),
    },
    {
      icon: CreditCard,
      title: getTextByLanguage("Subscription Plans", "सदस्यता योजनाहरू"),
      description: getTextByLanguage(
        "Create custom membership plans, manage pricing, and handle upgrades without the spreadsheet chaos.",
        "आफ्नै सदस्यता योजना बनाउनुहोस्, मूल्य व्यवस्थापन गर्नुहोस्, र स्प्रेडसिट झन्झट बिना अपग्रेड गर्नुहोस्।",
      ),
    },
    {
      icon: Calendar,
      title: getTextByLanguage("Attendance Tracking", "उपस्थिति ट्र्याकिङ"),
      description: getTextByLanguage(
        "Real-time check-ins so staff always know who's on the floor and members can see their consistency.",
        "रियल-टाइम चेक-इनका कारण स्टाफलाई सधैं थाहा हुन्छ को उपस्थित छ, र सदस्यले आफ्नो नियमितता देख्न सक्छन्।",
      ),
    },
    {
      icon: BarChart3,
      title: getTextByLanguage("Business Insights", "व्यवसाय विश्लेषण"),
      description: getTextByLanguage(
        "Revenue, retention, and growth reports that help gym owners make confident decisions.",
        "आम्दानी, धारण दर, र वृद्धि सम्बन्धी रिपोर्टहरूले जिम मालिकलाई निर्णय लिन सहयोग गर्छ।",
      ),
    },
    {
      icon: Bell,
      title: getTextByLanguage("Smart Notifications", "स्मार्ट सूचनाहरू"),
      description: getTextByLanguage(
        "Automatic reminders for renewals, expirations, and important membership updates.",
        "नवीकरण, म्याद सकिने मिति, र महत्त्वपूर्ण सदस्यता अपडेटका लागि स्वचालित रिमाइन्डरहरू।",
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-primary-light text-primary-dark border border-primary/20 rounded-full text-xs font-medium px-3 py-1 mb-6">
            <CheckCircle2 size={12} />
            {getTextByLanguage(
              "Trusted by gyms everywhere",
              "सबैतिरका जिमहरूको भरोसा",
            )}
          </span>

          <h1 className="font-poppins text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
            {getTextByLanguage("Run your gym", "आफ्नो जिम चलाउनुहोस्")}{" "}
            <span className="bg-linear-to-br from-green-primary to-green-secondary bg-clip-text text-transparent">
              {getTextByLanguage("smarter", "बुद्धिमानीपूर्वक")}
            </span>
            {getTextByLanguage(", not harder", "गाह्रो नभई")}
          </h1>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {getTextByLanguage(
              "One platform for owners, staff, and members — plans, attendance, payments, and permissions, all in sync.",
              "मालिक, स्टाफ, र सदस्यहरूका लागि एउटै प्लेटफर्म — योजना, उपस्थिति, भुक्तानी, र अनुमतिहरू सबै एकसाथ।",
            )}
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to={publicRoutePath.signup}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors font-poppins btn-glow"
            >
              {getTextByLanguage(
                "Start Free Trial",
                "निःशुल्क ट्रायल सुरु गर्नुहोस्",
              )}
              <ArrowRight size={16} />
            </Link>
            <Link
              to={publicRoutePath.login}
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors font-poppins"
            >
              {getTextByLanguage("Log In", "लग इन")}
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            {getTextByLanguage(
              "5-day free trial · No credit card required",
              "५ दिनको निःशुल्क ट्रायल · क्रेडिट कार्ड आवश्यक पर्दैन",
            )}
          </p>
        </div>

        {/* Background glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "var(--primary)" }}
        />
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="font-poppins text-3xl font-bold mb-3">
            {getTextByLanguage(
              "Everything your gym needs",
              "तपाईंको जिमलाई चाहिने सबै कुरा",
            )}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {getTextByLanguage(
              "Built for the whole team — from the front desk to the owner's office.",
              "फ्रन्ट डेस्कदेखि मालिकको कार्यालयसम्म — सम्पूर्ण टिमका लागि बनाइएको।",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="card-hover bg-card border border-card-border rounded-xl p-6"
            >
              <div className="w-11 h-11 rounded-lg bg-primary-light flex items-center justify-center mb-4">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="font-poppins font-semibold text-base mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="gradient-primary rounded-2xl px-8 py-14 text-center">
          <h2 className="font-poppins text-2xl sm:text-3xl font-bold text-white mb-3">
            {getTextByLanguage(
              "Ready to modernize your gym?",
              "आफ्नो जिम आधुनिक बनाउन तयार हुनुहुन्छ?",
            )}
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            {getTextByLanguage(
              "Set up your gym in minutes and try every feature free for 5 days.",
              "मिनेटैमा आफ्नो जिम सेटअप गर्नुहोस् र ५ दिनसम्म सबै सुविधा निःशुल्क प्रयोग गर्नुहोस्।",
            )}
          </p>
          <Link
            to={publicRoutePath.signup}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-dark rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors font-poppins"
          >
            {getTextByLanguage(
              "Create Your Gym",
              "आफ्नो जिम सिर्जना गर्नुहोस्",
            )}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md gradient-primary flex items-center justify-center">
              <Dumbbell size={14} className="text-white" />
            </div>
            <span className="font-poppins font-medium text-sm">Gym Site</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            {getTextByLanguage(
              "Gym Site. All rights reserved.",
              "जिम साइट। सर्वाधिकार सुरक्षित।",
            )}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
