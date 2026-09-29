import React, { type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ModalSize = "sm" | "md" | "lg" | "xl" | "3xl" | "5xl" | "7xl" | "screen";
interface IContentModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  cancleText?: string;
  confirmText?: string;
  content?: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  size?: ModalSize;
}

const modalSize: Record<ModalSize, string> = {
  sm: "sm:max-w-sm sm:max-h-[300px]",
  md: "sm:max-w-md sm:max-h-[400px]",
  lg: "sm:max-w-lg sm:max-h-[500px]",
  xl: "sm:max-w-xl sm:max-h-[600px]",
  "3xl": "sm:max-w-3xl sm:max-h-[700px]",
  "5xl": "sm:max-w-5xl sm:max-h-[800px]",
  "7xl": "sm:max-w-7xl sm:max-h-[900px]",
  screen: "sm:max-w-[calc(100vw-2rem)] sm:max-h-[calc(100vh-2rem)]",
};

const ContentModal = ({
  content,
  title,
  description,
  isOpen,
  onClose,
  cancleText,
  confirmText,
  className,
  showCloseButton = true,
  size,
}: IContentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(modalSize[size ?? "md"])}
      >
        <DialogHeader className="flex flex-col gap-1">
          <h1>{title}</h1>
          <span>{description}</span>
        </DialogHeader>
        <div className={cn("flex flex-col gap-2", className)}>{content}</div>
        <DialogFooter>
          {}
          <Button variant={"ghost"} onClick={() => onClose()}>
            {cancleText ? cancleText : "Cancle"}
          </Button>
          {confirmText && <Button>{confirmText}</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentModal;
