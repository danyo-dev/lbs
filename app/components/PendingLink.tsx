import { useState, useEffect } from "react";
import { To } from "react-router-dom";
import { NavLink, useResolvedPath, useTransition } from "@remix-run/react";

function useIsPendingPathname(to: To) {
  const { location } = useTransition();
  const { pathname } = useResolvedPath(to);
  return location?.pathname === pathname;
}

function useIsSlowTransition(ms = 300) {
  const transition = useTransition();
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    if (transition.state === "loading") {
      const id = setTimeout(() => setIsSlow(true), ms);
      return () => clearTimeout(id);
    } else {
      setIsSlow(false);
    }
  }, [transition, ms]);

  return isSlow;
}

export default function PendingLink({
  to,
  children,
  ...props
}: {
  to: To;
  className: ({ isActive }: { isActive: boolean }) => string;
  children: React.ReactNode;
  props?: React.ComponentProps<typeof NavLink>;
}) {
  const isSlow = useIsSlowTransition(300);
  const isPending = useIsPendingPathname(to);

  return (
    <>
      <NavLink
        style={{ opacity: isPending && isSlow ? 0.33 : 1 }}
        to={to}
        {...props}
      >
        {children}
        {isPending && isSlow && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </NavLink>
    </>
  );
}
