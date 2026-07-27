import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="relative flex flex-col items-center text-center max-w-md w-full">
        {/* Background 404 watermark */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[160px] font-black text-green-primary/5 select-none pointer-events-none leading-none tracking-tighter"
        >
          404
        </span>

        {/* Dumbbell icon */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-green-primary/10 border border-green-primary/20 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#07b18a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6.5 6.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
            <path d="M17.5 17.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
            <path d="M6.5 17.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
            <path d="M17.5 6.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
            <path d="M5.5 12h13" />
            <path d="M12 5.5v13" />
          </svg>
        </div>

        {/* Badge */}
        <span className="relative z-10 inline-flex items-center gap-1.5 bg-green-primary/10 text-green-primary border border-green-primary/20 rounded-full text-xs font-medium px-3 py-1 mb-4">
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
          Page not found
        </span>

        {/* Heading */}
        <h1 className="relative z-10 text-2xl font-bold text-foreground mb-1 font-poppins">
          Looks like you missed a rep
        </h1>

        {/* Divider */}
        <div className="relative z-10 w-10 h-0.5 bg-green-primary opacity-40 rounded-full my-3" />

        {/* Description */}
        <p className="relative z-10 text-sm text-muted-foreground leading-relaxed mb-8 max-w-xs">
          The page you're looking for doesn't exist or has been moved. Head back
          to the dashboard and keep the momentum going.
        </p>

        {/* Actions */}
        <div className="relative z-10 flex items-center gap-3 flex-wrap justify-center">
          <Button
            onClick={() => navigate(-1)}
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
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
            Go back
          </Button>
        </div>

        {/* Bottom hint */}
        {/* <p className="relative z-10 mt-10 text-xs text-muted-foreground">
          Need help?{" "}
          <button
            onClick={() => navigate("/support")}
            className="text-green-primary hover:underline font-medium bg-transparent border-none cursor-pointer p-0"
          >
            Contact support
          </button>
        </p> */}
      </div>
    </div>
  );
};

export default PageNotFound;
