import toast from "react-hot-toast";
import { X, CircleCheck } from "lucide-react";

interface IMessage {
  message: string;
  duration?: number;
}

const baseStyle = {
  background: "#4a934a", // Dark forest green from your image
  color: "#ffffff", // Pure white text
  padding: "16px 20px",
  borderRadius: "6px", // Slightly sharper corners like the image
  minWidth: "320px",
  position: "relative" as "relative",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
};

const closeButtonStyle = {
  position: "absolute" as "absolute",
  top: "8px",
  right: "8px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: "#ffffff",
  opacity: 0.8,
  padding: "4px",
};

export const showSuccessMessage = ({ message, duration = 3000 }: IMessage) => {
  return toast.custom(
    (t) => (
      <div
        style={{
          ...baseStyle,
          display: "flex",
          alignItems: "flex-start", // Aligns icon to the top of the text block
          gap: "12px",
          // Animation for the custom toast
          opacity: t.visible ? 1 : 0,
          transform: t.visible ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {/* The White Tick Icon */}
        <div style={{ marginTop: "2px" }}>
          <CircleCheck size={24} color="#ffffff" fill="transparent" />
        </div>

        {/* Text Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontWeight: "700", fontSize: "16px" }}>
            Successful
          </span>
          <span style={{ fontWeight: "400", fontSize: "14px", opacity: 0.9 }}>
            {message}
          </span>
        </div>

        {/* Close Button */}
        <button onClick={() => toast.dismiss(t.id)} style={closeButtonStyle}>
          <X size={16} />
        </button>
      </div>
    ),
    { duration },
  );
};

export const showErrorsMessage = ({ message, duration = 4000 }: IMessage) => {
  return toast.custom(
    (t) => (
      <div
        style={{
          ...baseStyle,
          background: "#D32F2F", // Vibrant red for error
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          opacity: t.visible ? 1 : 0,
          transition: "all 0.2s ease-in-out",
        }}
      >
        <div style={{ marginTop: "2px" }}>
          <X size={24} color="#ffffff" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontWeight: "700", fontSize: "16px" }}>Error</span>
          <span style={{ fontWeight: "400", fontSize: "14px", opacity: 0.9 }}>
            {message}
          </span>
        </div>

        <button onClick={() => toast.dismiss(t.id)} style={closeButtonStyle}>
          <X size={16} />
        </button>
      </div>
    ),
    { duration },
  );
};
