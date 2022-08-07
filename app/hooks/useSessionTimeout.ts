import { useEffect } from "react";
import { useSubmit, useTransition } from "@remix-run/react";
import type { CustomWindow } from "~/types/envTypes";

// Logs the user out if there was no interaction within the timelimit
// use after GO - LIVE

declare const window: CustomWindow;

export function useSessionTimeout() {
  const submit = useSubmit();
  const transition = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      submit(null, { method: "post", action: "/auth/logout" });
    }, window.ENV.AUTH0_SESSION_TIMEOUT);
    return () => clearTimeout(timer);
  }, [transition]);
}
