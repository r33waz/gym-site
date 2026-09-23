import { AlertTriangle, CheckCircle2, TriangleAlert } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { getTextByLanguage } from "@/i18n/i18n";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title?: string;
  description?: string;

  confirmText?: string;
  cancelText?: string;

  variant?: "success" | "warn" | "danger";
  loading?: boolean;
}

const modalContent = {
  success: {
    title: {
      en: "Confirmation",
      np: "पुष्टि",
    },
    description: {
      en: "Are you sure you want to continue?",
      np: "के तपाईं निश्चित रूपमा अगाडि बढ्न चाहनुहुन्छ?",
    },
    confirmText: {
      en: "Confirm",
      np: "पुष्टि गर्नुहोस्",
    },
    icon: CheckCircle2,
    iconClass: "bg-green-100 text-green-600",
  },

  warn: {
    title: {
      en: "Warning",
      np: "चेतावनी",
    },
    description: {
      en: "Please review this action before continuing.",
      np: "अगाडि बढ्नु अघि कृपया यो कार्य पुनः जाँच गर्नुहोस्।",
    },
    confirmText: {
      en: "Continue",
      np: "जारी राख्नुहोस्",
    },
    icon: TriangleAlert,
    iconClass: "bg-amber-100 text-amber-600",
  },

  danger: {
    title: {
      en: "Delete Confirmation",
      np: "मेटाउने पुष्टि",
    },
    description: {
      en: "This action cannot be undone. Are you sure you want to continue?",
      np: "यो कार्य फिर्ता लिन सकिँदैन। के तपाईं निश्चित रूपमा अगाडि बढ्न चाहनुहुन्छ?",
    },
    confirmText: {
      en: "Delete",
      np: "मेटाउनुहोस्",
    },
    icon: AlertTriangle,
    iconClass: "bg-red-100 text-red-600",
  },
} as const;

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  variant = "success",
  loading = false,
}: ConfirmationModalProps) => {
  const content = modalContent[variant];
  const Icon = content.icon;

  const buttonVariant = {
    success: "default",
    warn: "secondary",
    danger: "destructive",
  }[variant] as "default" | "secondary" | "destructive";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center space-y-4 text-center">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full ${content.iconClass}`}
          >
            <Icon className="h-8 w-8" />
          </div>

          <DialogTitle className="text-xl font-semibold">
            {title ?? getTextByLanguage(content.title.en, content.title.np)}
          </DialogTitle>

          <DialogDescription className="max-w-sm text-center text-muted-foreground">
            {description ??
              getTextByLanguage(content.description.en, content.description.np)}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {cancelText ?? getTextByLanguage("Cancel", "रद्द गर्नुहोस्")}
          </Button>

          <Button
            variant={buttonVariant}
            onClick={onConfirm}
            loading={loading}
            className="w-full sm:w-auto"
          >
            {confirmText ??
              getTextByLanguage(content.confirmText.en, content.confirmText.np)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
