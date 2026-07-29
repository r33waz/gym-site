import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "ne", label: "नेपाली", short: "नेप" },
] as const;

const LanguageTrans = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleChangeLanguage = (code: string) => {
    if (code === currentLang) return;
    i18n.changeLanguage(code);
  };

  const currentShort =
    LANGUAGES.find((l) => l.code === currentLang)?.short ?? "EN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "relative gap-1 border-2 border-primary/30 font-semibold",
            "dark:border-white/30 dark:hover:border-white dark:hover:bg-white/10",
            " duration-300",
          )}
        >
          <span className="text-xs">{currentShort}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-40">
        {LANGUAGES?.map((l, i) => (
          <React.Fragment key={l.code}>
            <DropdownMenuItem
              onClick={() => handleChangeLanguage(l.code)}
              className={cn(
                "cursor-pointer justify-between gap-2 py-2.5",
                currentLang === l.code &&
                  "bg-primary/10 text-primary font-medium",
              )}
            >
              {l.label}
            </DropdownMenuItem>
            {i < LANGUAGES.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageTrans;
