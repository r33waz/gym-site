import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  if (import.meta.env.DEV) {
    console.error("[ErrorBoundary]", error);
  }

  const errorMessage = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : String(error);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="relative flex flex-col items-center text-center max-w-md w-full">
        {/* Background watermark */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] font-black text-green-primary/5 select-none pointer-events-none leading-none tracking-tighter"
        >
          ERR
        </span>

        {/* Icon */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 9v4" />
            <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
            <path d="M12 16h.01" />
          </svg>
        </div>

        {/* Badge */}
        <span className="relative z-10 inline-flex items-center gap-1.5 bg-destructive/10 text-destructive border border-destructive/20 rounded-full text-xs font-medium px-3 py-1 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 8l0 4" />
            <path d="M12 16l.01 0" />
          </svg>
          Something went wrong
        </span>

        {/* Heading */}
        <h1 className="relative z-10 text-2xl font-bold text-foreground mb-1 font-poppins">
          Your workout hit a snag
        </h1>

        {/* Divider */}
        <div className="relative z-10 w-10 h-0.5 bg-green-primary opacity-40 rounded-full my-3" />

        {/* Description */}
        <p className="relative z-10 text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
          An unexpected error occurred. Try refreshing the page or going back to
          the dashboard to continue your session.
        </p>

        {/* Error details (dev only) */}
        {import.meta.env.DEV && (
          <details className="relative z-10 w-full mb-6 text-left rounded-lg border border-border bg-card p-3 cursor-pointer">
            <summary className="text-xs font-medium text-muted-foreground select-none">
              Error details (dev only)
            </summary>
            <pre className="mt-2 text-xs text-destructive overflow-auto max-h-32 whitespace-pre-wrap break-words">
              {errorMessage}
            </pre>
          </details>
        )}

        {/* Actions */}
        <div className="relative z-10 flex items-center gap-3 flex-wrap justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-primary hover:bg-green-dark text-white rounded-lg text-sm font-medium transition-colors duration-200 font-poppins"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
            </svg>
            Try again
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-gray-100 dark:hover:bg-dark-secondary text-muted-foreground hover:text-foreground border border-border rounded-lg text-sm font-medium transition-colors duration-200 font-poppins"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
            </svg>
            Back to dashboard
          </button>
        </div>

        {/* Bottom hint */}
        <p className="relative z-10 mt-10 text-xs text-muted-foreground">
          Issue persisting?{" "}
          <a
            href="/support"
            className="text-green-primary hover:underline font-medium"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default ErrorBoundary;
