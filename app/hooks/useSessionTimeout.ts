import { useEffect } from "react";
import { useSubmit, useTransition } from "remix";

// Logs the user out if there was no interaction within the timelimit
// use after GO - LIVE
export function useSessionTimeout() {
  const submit = useSubmit();
  const transition = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      submit(null, { method: "post", action: "/auth/logout" });
    }, 5 * 60_000);
    return () => clearTimeout(timer);
  }, [transition]);
}
