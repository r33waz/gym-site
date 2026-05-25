import toast from "react-hot-toast";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

interface IMessage {
  message: string;
  duration?: number;
}

const ProgressBar = ({
  duration,
  color,
}: {
  duration: number;
  color: string;
}) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      height: "3px",
      width: "100%",
      background: `${color}22`,
    }}
  >
    <div
      style={{
        height: "100%",
        background: color,
        width: "100%",
        transformOrigin: "left",
        animation: `shrink ${duration}ms linear forwards`,
      }}
    />
    <style>{`
      @keyframes shrink {
        from { transform: scaleX(1); }
        to   { transform: scaleX(0); }
      }
    `}</style>
  </div>
);

const toastWrapper = (
  visible: boolean,
  accentColor: string,
): React.CSSProperties => ({
  position: "relative",
  display: "flex",
  alignItems: "flex-start",
  gap: "14px",
  padding: "16px 18px",
  paddingRight: "40px",
  minWidth: "340px",
  maxWidth: "420px",
  borderRadius: "12px",
  background: "#ffffff",
  boxShadow:
    "0 0 0 1px rgba(0,0,0,0.06), 0 4px 6px -1px rgba(0,0,0,0.08), 0 10px 24px -4px rgba(0,0,0,0.12)",
  borderLeft: `4px solid ${accentColor}`,
  opacity: visible ? 1 : 0,
  transform: visible
    ? "translateY(0) scale(1)"
    : "translateY(-12px) scale(0.97)",
  transition:
    "opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)",
  overflow: "hidden",
  fontFamily:
    "'DM Sans', 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  boxSizing: "border-box" as "border-box",
});

const iconWrapper = (bgColor: string): React.CSSProperties => ({
  flexShrink: 0,
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  background: bgColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "1px",
});

const closeBtn: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: "#9ca3af",
  padding: "4px",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.15s, color 0.15s",
  lineHeight: 0,
};

export const showSuccessMessage = ({ message, duration = 3000 }: IMessage) => {
  const accent = "#16a34a";

  return toast.custom(
    (t) => (
      <div style={toastWrapper(t.visible, accent)}>
        <div style={iconWrapper("#dcfce7")}>
          <CheckCircle2 size={18} color={accent} strokeWidth={2.5} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            paddingTop: "1px",
          }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: "14px",
              color: "#111827",
              letterSpacing: "-0.01em",
              lineHeight: "1.4",
            }}
          >
            Success
          </span>
          <span
            style={{
              fontWeight: 400,
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: "1.5",
            }}
          >
            {message}
          </span>
        </div>

        <button
          onClick={() => toast.dismiss(t.id)}
          style={closeBtn}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6";
            (e.currentTarget as HTMLButtonElement).style.color = "#374151";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af";
          }}
        >
          <X size={14} strokeWidth={2.5} />
        </button>

        <ProgressBar duration={duration} color={accent} />
      </div>
    ),
    { duration },
  );
};

export const showErrorsMessage = ({ message, duration = 4000 }: IMessage) => {
  const accent = "#dc2626";

  return toast.custom(
    (t) => (
      <div style={toastWrapper(t.visible, accent)}>
        <div style={iconWrapper("#fee2e2")}>
          <AlertCircle size={18} color={accent} strokeWidth={2.5} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            paddingTop: "1px",
          }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: "14px",
              color: "#111827",
              letterSpacing: "-0.01em",
              lineHeight: "1.4",
            }}
          >
            Error
          </span>
          <span
            style={{
              fontWeight: 400,
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: "1.5",
            }}
          >
            {message}
          </span>
        </div>

        <button
          onClick={() => toast.dismiss(t.id)}
          style={closeBtn}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6";
            (e.currentTarget as HTMLButtonElement).style.color = "#374151";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af";
          }}
        >
          <X size={14} strokeWidth={2.5} />
        </button>

        <ProgressBar duration={duration} color={accent} />
      </div>
    ),
    { duration },
  );
};
